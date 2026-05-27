import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Engineering Student" },
      { name: "description", content: "Engineering student portfolio showcasing technical projects." },
      { property: "og:title", content: "Portfolio — Engineering Student" },
      { property: "og:description", content: "Engineering student portfolio showcasing technical projects." },
    ],
  }),
  component: Index,
});

type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "Short description of what this project does, the problem it solves, and your role in building it.",
    tech: ["Python", "NumPy", "Matplotlib"],
    links: [{ label: "GitHub", href: "#" }],
  },
  {
    title: "Project Two",
    description:
      "Short description of what this project does, the problem it solves, and your role in building it.",
    tech: ["C++", "Arduino", "Embedded"],
    links: [{ label: "GitHub", href: "#" }],
  },
  {
    title: "Project Three",
    description:
      "Short description of what this project does, the problem it solves, and your role in building it.",
    tech: ["React", "TypeScript", "Node.js"],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight">Your Name</h1>
          <p className="mt-2 text-muted-foreground">
            Engineering student. I build things — mostly software, sometimes hardware.
          </p>
          <nav className="mt-4 flex gap-4 text-sm">
            <a href="mailto:you@example.com" className="text-primary hover:underline">
              Email
            </a>
            <a href="#" className="text-primary hover:underline">
              GitHub
            </a>
            <a href="#" className="text-primary hover:underline">
              LinkedIn
            </a>
          </nav>
        </header>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="leading-relaxed">
            A short paragraph about yourself: what you study, what you&apos;re interested in,
            and what kinds of problems you like working on. Keep it honest and brief.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Projects
          </h2>
          <ul className="space-y-8">
            {projects.map((p) => (
              <li key={p.title} className="border-l-2 border-border pl-4">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.tech.join(" · ")}
                </p>
                {p.links && (
                  <div className="mt-2 flex gap-3 text-sm">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} className="text-primary hover:underline">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </h2>
          <p className="text-sm leading-relaxed">
            Python, C/C++, JavaScript/TypeScript, MATLAB, Git, Linux, SolidWorks
          </p>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name
        </footer>
      </div>
    </div>
  );
}
