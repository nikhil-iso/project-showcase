export type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-8">
      {projects.map((p) => (
        <li key={p.title} className="border-l-2 border-border pl-4">
          <h3 className="font-medium">{p.title}</h3>
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
      ))}
    </ul>
  );
}