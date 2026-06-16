import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2, Music2, Radio } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getSpotifyPlayback } from "../lib/api/spotify.functions";

const ACTIVE_REFRESH_INTERVAL_MS = 30_000;
const IDLE_REFRESH_INTERVAL_MS = 2 * 60_000;
const PROGRESS_TICK_MS = 1_000;
const RELATIVE_TIME_REFRESH_INTERVAL_MS = 60_000;

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function relativeTime(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

function ListeningShell({
  children,
  href,
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string | null;
  ariaLabel: string;
}) {
  const className =
    "group flex min-h-16 w-full max-w-full items-center gap-3 rounded border border-border bg-card/60 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/70 sm:w-[360px]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <div role="status" aria-label={ariaLabel} className={className}>
      {children}
    </div>
  );
}

export function SpotifyNowPlaying() {
  const [now, setNow] = useState(() => Date.now());
  const { data, isPending } = useQuery({
    queryKey: ["spotify-playback"],
    queryFn: () => getSpotifyPlayback(),
    refetchInterval: (query) =>
      query.state.data?.state === "track" && query.state.data.isPlaying
        ? ACTIVE_REFRESH_INTERVAL_MS
        : IDLE_REFRESH_INTERVAL_MS,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 15_000,
    retry: 1,
  });

  useEffect(() => {
    const intervalId = window.setInterval(
      () => setNow(Date.now()),
      data?.state === "track" && data.isPlaying
        ? PROGRESS_TICK_MS
        : RELATIVE_TIME_REFRESH_INTERVAL_MS,
    );

    return () => window.clearInterval(intervalId);
  }, [data]);

  const displayProgressMs = useMemo(() => {
    if (data?.state !== "track" || !data.isPlaying || data.progressMs == null) {
      return data?.state === "track" ? data.progressMs : null;
    }

    const elapsed = now - new Date(data.fetchedAt).getTime();
    return Math.min(data.track.durationMs, Math.max(0, data.progressMs + elapsed));
  }, [data, now]);

  if (data?.state === "unconfigured" && !data.showSetupHint) return null;

  if (isPending) {
    return (
      <ListeningShell ariaLabel="Checking Spotify playback">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">Checking Spotify</p>
          <p className="mt-1 text-muted-foreground">Loading listening status</p>
        </div>
      </ListeningShell>
    );
  }

  if (!data || data.state === "error") {
    return (
      <ListeningShell ariaLabel="Spotify playback unavailable">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
          <Music2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">Spotify unavailable</p>
          <p className="mt-1 text-muted-foreground">Listening status is offline</p>
        </div>
      </ListeningShell>
    );
  }

  if (data.state === "unconfigured") {
    return (
      <ListeningShell ariaLabel="Spotify setup required">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
          <Music2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">Spotify setup needed</p>
          <p className="mt-1 text-muted-foreground">Add Spotify env vars to enable this</p>
        </div>
      </ListeningShell>
    );
  }

  if (data.state === "empty") {
    return (
      <ListeningShell ariaLabel="No recent Spotify playback">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
          <Music2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">No recent Spotify plays</p>
          <p className="mt-1 text-muted-foreground">Nothing to show yet</p>
        </div>
      </ListeningShell>
    );
  }

  const progressPercent =
    displayProgressMs == null
      ? 0
      : Math.min(100, Math.max(0, (displayProgressMs / data.track.durationMs) * 100));
  const statusText = data.isPlaying
    ? "Listening now"
    : data.playedAt
      ? `Last played ${relativeTime(data.playedAt, now)}`
      : "Last played";

  return (
    <ListeningShell
      href={data.track.spotifyUrl}
      ariaLabel={`${statusText}: ${data.track.title} by ${data.track.artist}`}
    >
      {data.track.albumImageUrl ? (
        <img
          src={data.track.albumImageUrl}
          alt=""
          className="h-10 w-10 shrink-0 rounded object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
          <Music2 className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            {data.isPlaying ? (
              <span className="h-1.5 w-1.5 rounded-full bg-[#1DB954]" />
            ) : (
              <Radio className="h-3 w-3" />
            )}
            {statusText}
          </span>
          {data.track.spotifyUrl ? (
            <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          ) : null}
        </div>
        <p className="mt-0.5 truncate font-medium text-foreground">{data.track.title}</p>
        <p className="truncate text-muted-foreground">{data.track.artist}</p>
        {data.isPlaying && displayProgressMs != null ? (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[#1DB954] transition-[width] duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="tabular-nums text-[10px] text-muted-foreground">
              {formatDuration(displayProgressMs)}
            </span>
          </div>
        ) : null}
      </div>
    </ListeningShell>
  );
}
