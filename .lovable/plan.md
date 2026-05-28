## 1. Darker grey theme

In `src/styles.css`, drop the lightness on the grey tokens:
- `--background`: `oklch(0.22 0 0)` → `oklch(0.16 0 0)`
- `--card` / `--popover`: `oklch(0.26 0 0)` → `oklch(0.20 0 0)`
- `--secondary` / `--muted`: `oklch(0.30 0 0)` → `oklch(0.24 0 0)`
- `--border` / `--input`: `oklch(0.36 0 0)` → `oklch(0.30 0 0)`

Blue primary and purple accent stay the same.

## 2. Interleaved text + images in project details

Change the `details` field on `Project` from a single string to an ordered array of blocks:

```ts
type DetailBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption?: string };

type Project = {
  // ...
  details?: DetailBlock[];
};
```

Update `ProjectList.tsx`:
- The desktop slide-over panel and the mobile inline dropdown both render the `details` array in order: text paragraphs as `<p>`, images as `<figure>` with optional caption.
- Images use plain `<img>` with `loading="lazy"`, rounded border, `max-w-full`.

Convert the existing string `details` in `src/routes/index.tsx` and `src/routes/team.tsx` to `[{ type: "text", content: "..." }]` so nothing breaks. Leave them as text-only until you drop images in.

## 3. How you add pictures

Two options for each image:

- **Upload through chat** — drag a PNG/JPG into the chat. I'll save it under `src/assets/<name>.jpg`, import it, and slot it into the right `details` block for the right project. Just tell me which project + roughly where ("after the first paragraph of MRFC").
- **Drop into `public/`** — put files in `public/images/...` yourself and reference them as `/images/foo.jpg`. No import needed.

Either way the data shape is the same:

```ts
details: [
  { type: "text", content: "First paragraph..." },
  { type: "image", src: mrfcBoard, alt: "MRFC v1 board", caption: "Rev A bring-up" },
  { type: "text", content: "Second paragraph..." },
  { type: "image", src: "/images/mrfc-flight.jpg", alt: "Test flight" },
]
```

## Files touched
- `src/styles.css` — darker grey tokens
- `src/components/ProjectList.tsx` — render `DetailBlock[]` in panel + dropdown, export `DetailBlock` type
- `src/routes/index.tsx` — convert existing `details` strings to `[{ type: "text", ... }]`
- `src/routes/team.tsx` — same conversion
