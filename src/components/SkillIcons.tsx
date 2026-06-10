// Auto-discovers WebP icons in src/assets/skill-icons/<category>/*.webp at build
// time via Vite's import.meta.glob. To add a new icon, drop a PNG/JPG/SVG into
// media-source/skill-icons/<category>/ and run `bun run icons:build`.

const engineeringIcons = import.meta.glob("../assets/skill-icons/engineering/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const languageIcons = import.meta.glob("../assets/skill-icons/languages/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const platformIcons = import.meta.glob("../assets/skill-icons/platforms/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type IconEntry = { name: string; url: string };

function fileNameOf(path: string) {
  return path.split("/").pop()!.replace(/\.webp$/i, "");
}

function prettify(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function toEntries(group: Record<string, string>): IconEntry[] {
  return Object.entries(group)
    .map(([path, url]) => ({ name: prettify(fileNameOf(path)), url }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function IconGrid({ entries }: { entries: IconEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-xs italic text-muted-foreground">
        No icons yet. Drop images into <code className="font-mono">media-source/skill-icons/</code>{" "}
        and run <code className="font-mono">bun run icons:build</code>.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {entries.map((e) => (
        <li
          key={e.url}
          className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card/40 p-3 text-center transition-colors hover:border-primary"
          title={e.name}
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src={e.url}
              alt={e.name}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <span className="line-clamp-2 text-[11px] leading-tight text-muted-foreground group-hover:text-foreground">
            {e.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function SkillIcons() {
  const groups: { title: string; entries: IconEntry[] }[] = [
    { title: "Engineering Tools", entries: toEntries(engineeringIcons) },
    { title: "Programming Languages", entries: toEntries(languageIcons) },
    { title: "Platforms", entries: toEntries(platformIcons) },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-3 text-sm font-medium text-foreground">{g.title}</h3>
          <IconGrid entries={g.entries} />
        </div>
      ))}
    </div>
  );
}