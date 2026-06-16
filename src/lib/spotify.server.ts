import process from "node:process";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type SpotifyTrackItem = {
  type: "track";
  name: string;
  duration_ms: number;
  external_urls?: { spotify?: string };
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: SpotifyImage[];
  };
};

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  progress_ms: number | null;
  currently_playing_type: string;
  item: unknown;
};

type RecentlyPlayedResponse = {
  items: Array<{
    played_at: string;
    track: unknown;
  }>;
};

type AccessTokenCache = {
  token: string;
  expiresAt: number;
};

export type SpotifyListeningStatus =
  | {
      state: "unconfigured";
      showSetupHint: boolean;
    }
  | {
      state: "empty";
    }
  | {
      state: "error";
    }
  | {
      state: "track";
      isPlaying: boolean;
      progressMs: number | null;
      playedAt: string | null;
      fetchedAt: string;
      track: {
        title: string;
        artist: string;
        album: string;
        durationMs: number;
        albumImageUrl: string | null;
        spotifyUrl: string | null;
      };
    };

let accessTokenCache: AccessTokenCache | null = null;

function getSpotifyConfig() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    showSetupHint: process.env.NODE_ENV !== "production",
  };
}

function isTrackItem(item: unknown): item is SpotifyTrackItem {
  if (!item || typeof item !== "object") return false;
  const maybeTrack = item as Partial<SpotifyTrackItem>;
  return (
    maybeTrack.type === "track" &&
    typeof maybeTrack.name === "string" &&
    typeof maybeTrack.duration_ms === "number" &&
    Array.isArray(maybeTrack.artists) &&
    !!maybeTrack.album &&
    Array.isArray(maybeTrack.album.images)
  );
}

function pickAlbumImage(images: SpotifyImage[]): string | null {
  const sorted = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  return sorted.find((image) => (image.width ?? 0) >= 96)?.url ?? sorted.at(-1)?.url ?? null;
}

function toListeningStatus(
  track: SpotifyTrackItem,
  options: {
    isPlaying: boolean;
    progressMs: number | null;
    playedAt: string | null;
  },
): SpotifyListeningStatus {
  return {
    state: "track",
    isPlaying: options.isPlaying,
    progressMs: options.progressMs,
    playedAt: options.playedAt,
    fetchedAt: new Date().toISOString(),
    track: {
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      durationMs: track.duration_ms,
      albumImageUrl: pickAlbumImage(track.album.images),
      spotifyUrl: track.external_urls?.spotify ?? null,
    },
  };
}

async function getAccessToken(): Promise<string | null> {
  const config = getSpotifyConfig();
  if (!config.clientId || !config.clientSecret || !config.refreshToken) return null;

  const now = Date.now();
  if (accessTokenCache && accessTokenCache.expiresAt > now + 60_000) {
    return accessTokenCache.token;
  }

  const basicAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) {
    throw new Error("Spotify token response did not include an access token");
  }

  accessTokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };

  return accessTokenCache.token;
}

async function getCurrentlyPlaying(token: string): Promise<SpotifyListeningStatus | null> {
  const response = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 204) return null;
  if (!response.ok) {
    throw new Error(`Spotify currently-playing request failed with ${response.status}`);
  }

  const data = (await response.json()) as CurrentlyPlayingResponse;
  if (!data.is_playing || data.currently_playing_type !== "track" || !isTrackItem(data.item)) {
    return null;
  }

  return toListeningStatus(data.item, {
    isPlaying: true,
    progressMs: data.progress_ms,
    playedAt: null,
  });
}

async function getRecentlyPlayed(token: string): Promise<SpotifyListeningStatus | null> {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify recently-played request failed with ${response.status}`);
  }

  const data = (await response.json()) as RecentlyPlayedResponse;
  const recent = data.items[0];
  if (!recent || !isTrackItem(recent.track)) return null;

  return toListeningStatus(recent.track, {
    isPlaying: false,
    progressMs: null,
    playedAt: recent.played_at,
  });
}

export async function getSpotifyListeningStatus(): Promise<SpotifyListeningStatus> {
  const config = getSpotifyConfig();
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      state: "unconfigured",
      showSetupHint: config.showSetupHint,
    };
  }

  try {
    const currentlyPlaying = await getCurrentlyPlaying(accessToken);
    if (currentlyPlaying) return currentlyPlaying;

    const recentlyPlayed = await getRecentlyPlayed(accessToken);
    return recentlyPlayed ?? { state: "empty" };
  } catch (error) {
    console.error(error);
    return { state: "error" };
  }
}
