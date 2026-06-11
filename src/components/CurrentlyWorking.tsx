import { useQuery } from "@tanstack/react-query";

type PushEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
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
  const res = await fetch(
    "https://api.github.com/users/nikhil-iso/events/public",
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) return null;
  const events = (await res.json()) as PushEvent[];
  const push = events.find(
    (e) => e.type === "PushEvent" && e.payload.commits && e.payload.commits.length > 0,
  );
  if (!push) return null;
  const commit = push.payload.commits![push.payload.commits!.length - 1];
  return {
    repo: push.repo.name,
    repoShort: push.repo.name.split("/").pop() ?? push.repo.name,
    message: commit.message.split("\n")[0],
    date: push.created_at,
    url: `https://github.com/${push.repo.name}/commit/${commit.sha}`,
  };
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
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
  const { data: commit } = useQuery({
    queryKey: ["latest-github-commit", "nikhil-iso"],
    queryFn: fetchLatestCommit,
    staleTime: 5 * 60_000,
    retry: 1,
  });

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
          · &ldquo;{commit.message}&rdquo; · {relativeTime(commit.date)}
        </p>
      ) : null}
    </div>
  );
}