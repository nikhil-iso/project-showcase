## Plan

### 1. Header component (`src/components/SiteHeader.tsx`)
- Fixed header across the top, full width, black background, thin bottom border.
- Left: name "Nikhil Patel" linking to `/`.
- Middle: nav `Link`s — Home, Personal Projects, Team Projects.
- Right: three buttons that open the PDFs in a new tab (`target="_blank"`):
  - CV → `/cv.pdf`
  - Resume → `/resume.pdf`
  - Portfolio → `/portfolio.pdf`
- Auto-hide behavior: a small `useEffect` tracks `window.scrollY`; when scrolling down past ~80px the header translates off-screen (`-translate-y-full`), when scrolling up it returns. Plain CSS `transition-transform`, no animation library.
- Mounted in `src/routes/__root.tsx` so it appears on every page. Add top padding to page content to avoid being covered.

### 2. PDF files
- You'll upload `cv.pdf`, `resume.pdf`, `portfolio.pdf`. I'll drop them in `public/` so they're served at `/cv.pdf` etc.

### 3. Split projects into two routes
- Keep **Personal Projects** on the home page (`src/routes/index.tsx`) along with About and Skills. Remove the Team Projects section from index.
- New route `src/routes/team.tsx` → `/team` containing only the Team Projects list, with its own `head()` meta (title "Team Projects — Nikhil Patel", matching description).
- Move the `teamProjects` array and project list markup into the new file. Extract the repeated project list rendering into a small `ProjectList` component in `src/components/ProjectList.tsx` to avoid duplication.

### 4. Styling
- Reuse existing semantic tokens (`bg-background`, `text-foreground`, `border-border`, `text-primary`). No new colors, no gradients.
- Buttons in the header use the existing shadcn `Button` with `variant="outline"` and `size="sm"` to stay minimal.

### Files touched
- new: `src/components/SiteHeader.tsx`, `src/components/ProjectList.tsx`, `src/routes/team.tsx`
- edit: `src/routes/__root.tsx` (mount header), `src/routes/index.tsx` (remove team section, use ProjectList)
- add: `public/cv.pdf`, `public/resume.pdf`, `public/portfolio.pdf` (your uploads)