## What I'm building

A compact section on the home page, placed between **About** and **Personal Projects**, titled **"Currently"** (uppercase tracking style matching the other section headers).

It has two parts:

1. **Manual blurb** (easy to edit later in `src/routes/index.tsx`)
   - Initial text: *"Currently working on composite manufacturing for Project Theseus' propulsion boat tail."*
2. **Latest GitHub commit** — auto-fetched from your public activity
   - Shows: repo name (linked to the commit), commit message (first line), and relative date (e.g. "2 days ago")
   - Compact one-liner, muted styling

## How it works

- New component `src/components/CurrentlyWorking.tsx`
- Fetches `https://api.github.com/users/nikhil-iso/events/public` directly from the browser using `@tanstack/react-query` (already installed) — no API key needed, no server function required.
- Filters for the most recent `PushEvent`, takes the latest commit from that push.
- Graceful fallback: if the request fails or rate-limits, the blurb still renders and the commit line is hidden silently.
- Lightweight: no extra dependencies, no backend, no Lovable Cloud needed.

## Files

- **Create** `src/components/CurrentlyWorking.tsx` — the section component, accepts a `blurb` prop.
- **Edit** `src/routes/index.tsx` — import the component and render it as a new `<section>` between the About and Personal Projects sections.

## Layout sketch

```text
About
─────────────────────────────────
CURRENTLY
  Working on composite manufacturing for Project Theseus' propulsion boat tail.
  Latest commit: MRFC · "fix sd logging race" · 2 days ago
─────────────────────────────────
Personal Projects
```
