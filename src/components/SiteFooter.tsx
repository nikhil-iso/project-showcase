import { SpotifyNowPlaying } from "./SpotifyNowPlaying";
import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
        <span className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Nikhil Patel. All Rights Reserved.
        </span>
        <SpotifyNowPlaying />
        <ThemeToggle />
      </div>
    </footer>
  );
}
