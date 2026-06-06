import { useEffect, useRef, useState } from "react";

export type DetailBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; alt: string; caption?: string; poster?: string };

export type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
  details?: DetailBlock[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "text") {
          return (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
            >
              {b.content}
            </p>
          );
        }

        if (b.type === "video") {
          return (
            <figure key={i} className="space-y-1">
              <video
                src={b.src}
                aria-label={b.alt}
                poster={b.poster}
                controls
                preload="metadata"
                playsInline
                className="w-full rounded border border-border"
              />
              {b.caption && (
                <figcaption className="text-center text-xs text-muted-foreground">
                  {b.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return (
          <figure key={i} className="space-y-1">
            <img
              src={b.src}
              alt={b.alt}
              loading="lazy"
              className="w-full rounded border border-border"
            />
            {b.caption && (
              <figcaption className="text-center text-xs text-muted-foreground">
                {b.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

function ProjectMeta({ p }: { p: Project }) {
  return (
    <>
      <p className="text-sm leading-relaxed">{p.description}</p>
      {p.details && p.details.length > 0 && (
        <div className="mt-4">
          <DetailBlocks blocks={p.details} />
        </div>
      )}
      <p className="mt-4 text-xs text-muted-foreground">{p.tech.join(" · ")}</p>
      {p.links && (
        <div className="mt-3 flex gap-3 text-sm">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [panelIdx, setPanelIdx] = useState<number | null>(null);

  const active = panelIdx !== null ? projects[panelIdx] : null;

  // On mount (and on hash change), if the URL targets a project slug OR a text
  // fragment that lives inside one of our project entries, open the panel for
  // that project and scroll it into view so anchors and Chrome "copy link to
  // highlight" links resolve correctly.
  useEffect(() => {
    const slugs = projects.map((p) => slugify(p.title));

    const openMatching = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hash) return;

      // Plain #slug anchor
      const slugMatch = hash.split(":~:")[0];
      let idx = slugs.indexOf(slugMatch);

      // Text fragment (#:~:text=...) — find which project contains the text
      if (idx === -1 && hash.includes(":~:text=")) {
        const raw = hash.split(":~:text=")[1] ?? "";
        const needle = decodeURIComponent(raw.split("&")[0].split(",")[0])
          .toLowerCase()
          .trim();
        if (needle) {
          idx = projects.findIndex((p) => {
            const hay = [
              p.title,
              p.description,
              ...(p.details ?? []).map((d) =>
                d.type === "text" ? d.content : d.type === "image" || d.type === "video" ? d.caption ?? "" : ""
              ),
            ]
              .join(" ")
              .toLowerCase();
            return hay.includes(needle);
          });
        }
      }

      if (idx >= 0) {
        const el = document.getElementById(slugs[idx]);
        if (el) {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
        setPanelIdx(idx);
      }
    };

    openMatching();
    window.addEventListener("hashchange", openMatching);
    return () => window.removeEventListener("hashchange", openMatching);
  }, [projects]);

  return (
    <>
      <ul className="space-y-8">
        {projects.map((p, i) => {
          const slug = slugify(p.title);
          const hasDetails = !!p.details && p.details.length > 0;
          return (
            <li key={p.title} id={slug} className="scroll-mt-20 border-l-2 border-border pl-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 flex-1 break-words font-medium">{p.title}</h3>
                {hasDetails && (
                  <button
                    type="button"
                    onClick={() => setPanelIdx(i)}
                    className="shrink-0 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    Open
                  </button>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.tech.join(" · ")}</p>
              {p.links && (
                <div className="mt-2 flex gap-3 text-sm">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Slide-over panel */}
      <div
        className={`fixed inset-x-0 bottom-0 top-14 z-40 ${active ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!active}
      >
        <div
          onClick={() => setPanelIdx(null)}
          className={`absolute inset-0 bg-background/60 transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-6 shadow-xl transition-transform duration-200 ${active ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="min-w-0 flex-1 break-words text-lg font-medium">{active?.title}</h3>
            <button
              type="button"
              onClick={() => setPanelIdx(null)}
              className="rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent"
            >
              Close
            </button>
          </div>
          {active && <ProjectMeta p={active} />}
        </aside>
      </div>
    </>
  );
}
