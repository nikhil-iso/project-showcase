import { createServerFn } from "@tanstack/react-start";

import type { SpotifyListeningStatus } from "../spotify.server";

export const getSpotifyPlayback = createServerFn({ method: "GET" }).handler(
  async (): Promise<SpotifyListeningStatus> => {
    const { getSpotifyListeningStatus } = await import("../spotify.server");
    return getSpotifyListeningStatus();
  },
);
