import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Nikhil Patel. All Rights Reserved.</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}