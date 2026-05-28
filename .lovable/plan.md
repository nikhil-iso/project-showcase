## Theme update (`src/styles.css`)

Replace the pure-black palette with dark grey + blue/purple accents (oklch):
- `--background`: dark grey ~`oklch(0.22 0 0)`
- `--card` / `--popover`: slightly lighter grey ~`oklch(0.26 0 0)`
- `--secondary` / `--muted`: ~`oklch(0.30 0 0)`
- `--border` / `--input`: ~`oklch(0.36 0 0)`
- `--primary` / `--ring`: blue `oklch(0.62 0.18 250)` (kept)
- `--accent`: purple `oklch(0.62 0.20 295)`
- Foreground stays near-white

Header (`SiteHeader.tsx`) currently uses `bg-black`; switch to `bg-background` (or `bg-card`) so it matches the new grey.

## Project details: panel on desktop, dropdown on mobile

Add an optional `details` field to the `Project` type (long-form text/JSX — extra context beyond the short description). Populate for the existing projects in `index.tsx` and `team.tsx`.

Rework `ProjectList.tsx`:
- Each project row gets a "Details" button.
- Track a single selected project in local state.
- Desktop (`md:` and up): clicking "Details" opens a slide-in panel docked to the right side of the viewport (fixed position, ~`max-w-md`, slides in via a CSS `transform` + `transition-transform` — no animation library). Backdrop click and a close button dismiss it. Uses `bg-card`, `border-l border-border`.
- Mobile (`< md`): the same button toggles an inline dropdown that expands directly under the project (simple `max-height`/conditional render). No slide-over on mobile.
- Implementation: render both, hide the desktop panel with `hidden md:block` and the mobile dropdown with `md:hidden`. Keep one piece of state per list.

Used on both `/` (Personal Projects) and `/team` (Team Projects) via the shared `ProjectList`.

## Files touched
- `src/styles.css` — recolor tokens
- `src/components/SiteHeader.tsx` — swap `bg-black` → `bg-background`
- `src/components/ProjectList.tsx` — add details button + desktop slide panel + mobile dropdown
- `src/routes/index.tsx` — add `details` content for personal projects
- `src/routes/team.tsx` — add `details` content for team projects

## Notes
- No new dependencies; transitions are plain Tailwind CSS classes (`transition-transform`, `translate-x-full` ↔ `translate-x-0`).
- Accent purple is available as `bg-accent` / `text-accent` for selective highlights (e.g. selected project, detail panel heading underline).
- Per your "keep it simple" rule, animations are limited to a single transform transition on the desktop panel; mobile dropdown just shows/hides.
