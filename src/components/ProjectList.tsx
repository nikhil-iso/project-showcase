import { useState } from "react";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
  details?: string;
};

function ProjectMeta({ p }: { p: Project }) {
  return (
    <>
      <p className="text-sm leading-relaxed">{p.description}</p>
      {p.details && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {p.details}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">{p.tech.join(" · ")}</p>
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
  // separate state for desktop slide-over vs mobile inline dropdown
  const [panelIdx, setPanelIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const active = panelIdx !== null ? projects[panelIdx] : null;

  return (
    <>
      <ul className="space-y-8">
        {projects.map((p, i) => {
          const isOpen = openIdx === i;
          return (
            <li key={p.title} className="border-l-2 border-border pl-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium">{p.title}</h3>
                <>
                  <button
                    type="button"
                    onClick={() => setPanelIdx(i)}
                    className="hidden shrink-0 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent md:inline-block"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="shrink-0 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent md:hidden"
                  >
                    {isOpen ? "Hide" : "Details"}
                  </button>
                </>
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
              {isOpen && p.details && (
                <div className="mt-3 rounded border border-border bg-card p-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line md:hidden">
                  {p.details}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Desktop slide-over panel */}
      <div
        className={`fixed inset-0 z-40 hidden md:block ${active ? "pointer-events-auto" : "pointer-events-none"}`}
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
            <h3 className="text-lg font-medium">{active?.title}</h3>
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