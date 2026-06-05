## Goal

Allow direct links to any project (e.g. `/team#project-up`) and to highlighted text inside a project's details (Chrome's "Copy link to highlight" → `#:~:text=...`). Keep the current collapsed-by-default UX so the pages still look clean.

## Why the current code breaks this

In `src/components/ProjectList.tsx`, detail content is only rendered when `openIdx === i` (mobile) or `panelIdx === i` (desktop). Text fragments and `#hash` scrolling rely on the target text/element being in the DOM at load time, so today nothing matches and the browser scrolls nowhere.

## Changes

### 1. `src/components/ProjectList.tsx`
- Add a `slugify(title)` helper. Each `<li>` gets `id={slug}` so `/team#project-up`, `/#chess-engine`, etc. work.
- Always render the `DetailBlocks` for every project in the DOM. Hide them visually when collapsed using `<details>` (native HTML) OR a `hidden` attribute toggled by state combined with CSS `display: none`. Prefer `<details>`/`<summary>` because:
  - Native browser support for in-page find (Ctrl+F) auto-expanding matching `<details>`.
  - Anchor/text-fragment scroll auto-expands the containing `<details>` in Chromium.
  - Removes the need for the JS open/close state on mobile entirely.
- Desktop slide-over: keep the existing slide-over for the polished read view, but feed it from the same already-mounted content (or simply also render details inline on desktop and drop the slide-over — see open question below). Default plan: keep slide-over, and ALSO render the inline collapsed `<details>` on desktop so links still resolve. Slide-over remains a convenience for browsing.
- On mount, read `window.location.hash` (and `:~:text=` fragment). If it targets a project slug or matches text inside one, force that project's `<details>` open and call `scrollIntoView` so the browser highlight lands correctly. This covers Safari/Firefox which don't auto-open `<details>` on fragment nav.

### 2. Styling
- Style `<summary>` to match the existing "Details" button (border, padding, hover accent) so the visual language is preserved. Hide the default disclosure triangle (`summary::-webkit-details-marker { display: none }` and `list-style: none`).
- Ensure the slide-over still works on desktop without duplicate visual weight — collapsed inline `<details>` only shows the summary button, identical to today.

### 3. No route changes
Single-route per page is kept. Anchors and text fragments are pure client-side.

## Technical notes

- Slugs are derived from `p.title` (lowercase, non-alphanumerics → `-`, collapsed). Stable as long as titles don't change; acceptable for a portfolio.
- Text fragment support: Chrome/Edge/Opera/Safari 16.1+. Firefox needs a flag. That's the current state of the web platform — nothing we can fix.
- No backend, no new dependencies.

## Open question (non-blocking)

Should the desktop slide-over stay, or should desktop also just use inline `<details>` like mobile? Keeping the slide-over is fine but adds redundancy. I'll keep it unless you say otherwise.

## Files touched

- `src/components/ProjectList.tsx` (only file)
