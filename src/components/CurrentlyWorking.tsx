import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const GITHUB_USER = "nikhil-iso";
const COMMIT_REFRESH_INTERVAL_MS = 2 * 60_000;
const RELATIVE_TIME_REFRESH_INTERVAL_MS = 60_000;

type PushEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    head?: string;
    commits?: Array<{ sha: string; message: string }>;
  };
};

type LatestCommit = {
  repo: string;
  repoShort: string;
  message: string;
  date: string;
  url: string;
};

async function fetchLatestCommit(): Promise<LatestCommit | null> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`, {
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub events request failed with ${res.status}`);
  }
  const events = (await res.json()) as PushEvent[];
  const push = events.find((e) => e.type === "PushEvent");
  if (!push) return null;

  // Prefer inline commits when present; otherwise fetch by head SHA.
  let sha: string | undefined;
  let message: string | undefined;
  if (push.payload.commits && push.payload.commits.length > 0) {
    const c = push.payload.commits[push.payload.commits.length - 1];
    sha = c.sha;
    message = c.message;
  } else if (push.payload.head) {
    sha = push.payload.head;
    try {
      const cRes = await fetch(`https://api.github.com/repos/${push.repo.name}/commits/${sha}`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (cRes.ok) {
        const data = (await cRes.json()) as { commit?: { message?: string } };
        message = data.commit?.message;
      }
    } catch {
      // Ignore commit detail failures; the event still links to the commit SHA.
    }
  }
  if (!sha) return null;

  return {
    repo: push.repo.name,
    repoShort: push.repo.name.split("/").pop() ?? push.repo.name,
    message: (message ?? "new commit").split("\n")[0],
    date: push.created_at,
    url: `https://github.com/${push.repo.name}/commit/${sha}`,
  };
}

function relativeTime(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  const diff = now - then;
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

export function CurrentlyWorking({ blurb }: { blurb: string }) {
  const [now, setNow] = useState(() => Date.now());
  const {
    data: commit,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["latest-github-commit", GITHUB_USER],
    queryFn: fetchLatestCommit,
    refetchInterval: COMMIT_REFRESH_INTERVAL_MS,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: COMMIT_REFRESH_INTERVAL_MS,
    retry: 1,
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, RELATIVE_TIME_REFRESH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <p className="leading-relaxed">{blurb}</p>
      {commit ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="text-foreground/80">Latest commit:</span>{" "}
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {commit.repoShort}
          </a>{" "}
          &middot; &ldquo;{commit.message}&rdquo; &middot; {relativeTime(commit.date, now)}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="text-foreground/80">Latest commit:</span>{" "}
          {isPending
            ? "Checking GitHub..."
            : isError
              ? "Temporarily unavailable"
              : "No public commits found"}
        </p>
      )}
    </div>
  );
}
