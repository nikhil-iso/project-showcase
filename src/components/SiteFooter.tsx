import { SpotifyNowPlaying } from "./SpotifyNowPlaying";
import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center justify-items-center gap-4 px-6 py-6 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr] md:px-8">
        <div className="order-3 md:order-1 md:justify-self-start">
          <ThemeToggle />
        </div>
        <div className="order-1 w-full max-w-[320px] md:order-2">
          <SpotifyNowPlaying />
        </div>
        <span className="order-2 text-center md:order-3 md:justify-self-end md:text-right">
          &copy; {new Date().getFullYear()} Nikhil Patel. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
