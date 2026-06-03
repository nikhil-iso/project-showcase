import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { canonicalUrl } from "../lib/site";

const pdfs = [
  { label: "CV", href: canonicalUrl("/Nikhil_Patel_cv.pdf") },
  { label: "Resume", href: canonicalUrl("/Nikhil_Patel_Resume.pdf") },
  { label: "Portfolio", href: canonicalUrl("/Nikhil_Patel_Projects.pdf") },
];

const navLinks = [
  { path: "/", href: canonicalUrl("/"), label: "Home" },
  { path: "/team", href: canonicalUrl("/team"), label: "Team Projects" },
];

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

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
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href={canonicalUrl("/")} className="text-sm font-semibold tracking-tight">
          Nikhil - Eng
        </a>
        <nav className="flex gap-3 text-sm sm:gap-5">
          {navLinks.map((l) => {
            const isActive = pathname === l.path;
            return (
              <a
                key={l.href}
                href={l.href}
                className={isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
              >
                {l.label}
              </a>
            );
          })}
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
