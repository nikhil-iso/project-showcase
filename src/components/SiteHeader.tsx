import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const pdfs = [
  { label: "CV", href: "/cv.pdf" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Portfolio", href: "/portfolio.pdf" },
];

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/team" as const, label: "Team Projects" },
];

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastY) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background transition-transform duration-200 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Nikhil Patel
        </Link>
        <nav className="hidden gap-5 text-sm sm:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          {pdfs.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-3 py-1 text-xs text-foreground hover:border-primary hover:text-primary"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}