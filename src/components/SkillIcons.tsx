import { useMemo, useState } from "react";
import { projectSlug, type Project } from "./ProjectList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Auto-discovers WebP icons in src/assets/skill-icons/<category>/*.webp at build
// time via Vite's import.meta.glob. To add a new icon, drop a PNG/JPG/SVG into
// media-source/skill-icons/<category>/ and run `npm run icons:build`.

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

type IconEntry = { id: string; name: string; url: string };
type ProjectCategory = "Personal" | "Team";
type ProjectReference = {
  project: Project;
  category: ProjectCategory;
  href: string;
};

const skillLabels: Record<string, string> = {
  ansys: "ANSYS",
  arduino: "Arduino",
  autocad: "AutoCAD",
  autodesk: "Autodesk",
  "civil-3d": "Civil 3D",
  cpp: "C++",
  excel: "Excel",
  "fusion-360": "Fusion 360",
  github: "GitHub",
  "google-suite": "Google Suite",
  html5: "HTML5",
  inventor: "Inventor",
  java: "Java",
  matlab: "MATLAB",
  "microsoft-office": "Microsoft Office",
  "microsoft-project": "Microsoft Project",
  onshape: "Onshape",
  openrocket: "OpenRocket",
  python: "Python",
  revit: "Revit",
  sketchup: "SketchUp",
  solidworks: "SolidWorks",
  vercel: "Vercel",
};

const skillAliases: Record<string, string[]> = {
  ansys: ["ANSYS", "ANSYS FEA"],
  arduino: ["Arduino", "Arduino Micro"],
  cpp: ["C++"],
  html5: ["HTML5", "HTML/CSS"],
};

const groupedCadSkillIds = new Set([
  "autocad",
  "fusion-360",
  "inventor",
  "onshape",
  "solidworks",
]);

const groupedCadTechnologyNames = [
  "AutoCAD",
  "Fusion 360",
  "Inventor",
  "Onshape",
  "SolidWorks",
];

function fileNameOf(path: string) {
  return path
    .split("/")
    .pop()!
    .replace(/\.webp$/i, "");
}

function prettify(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .trim();
}

function normalizeSkillName(name: string) {
  return name
    .toLowerCase()
    .replace(/\+\+/g, "pp")
    .replace(/[^a-z0-9]+/g, "");
}

function toEntries(group: Record<string, string>): IconEntry[] {
  return Object.entries(group)
    .map(([path, url]) => {
      const id = fileNameOf(path);
      return { id, name: skillLabels[id] ?? prettify(id), url };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const skillGroups: { title: string; entries: IconEntry[] }[] = [
  { title: "Engineering Tools", entries: toEntries(engineeringIcons) },
  { title: "Programming Languages", entries: toEntries(languageIcons) },
  { title: "Platforms", entries: toEntries(platformIcons) },
];

const allSkillEntries = skillGroups.flatMap((group) => group.entries);

function matchesSkill(project: Project, skill: IconEntry) {
  const groupedNames = groupedCadSkillIds.has(skill.id)
    ? groupedCadTechnologyNames
    : [];
  const matchNames = new Set(
    [skill.id, skill.name, ...(skillAliases[skill.id] ?? []), ...groupedNames].map(
      normalizeSkillName,
    ),
  );

  return project.tech.some((technology) => matchNames.has(normalizeSkillName(technology)));
}

function matchCountLabel(count: number) {
  if (count === 0) return "No listed projects yet";
  return `${count} ${count === 1 ? "project" : "projects"}`;
}

function SkillPreview({
  skill,
  matches,
}: {
  skill: IconEntry;
  matches: ProjectReference[];
}) {
  return (
    <div className="max-w-64">
      <p className="font-medium">{skill.name}</p>
      {matches.length > 0 ? (
        <>
          <p className="mt-1 text-[11px] opacity-80">
            {groupedCadSkillIds.has(skill.id) ? "CAD group · " : ""}
            {matchCountLabel(matches.length)}
          </p>
          <ul className="mt-2 space-y-1">
            {matches.map(({ project, category }) => (
              <li key={`${category}-${project.title}`} className="leading-snug">
                <span className="opacity-70">{category}:</span> {project.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-1 opacity-80">No listed projects yet.</p>
      )}
    </div>
  );
}

function IconGrid({
  entries,
  matchesBySkill,
  selectedSkillId,
  onSelect,
}: {
  entries: IconEntry[];
  matchesBySkill: Map<string, ProjectReference[]>;
  selectedSkillId: string | null;
  onSelect: (skillId: string) => void;
}) {
  if (entries.length === 0) {
    return (
      <p className="text-xs italic text-muted-foreground">
        No icons yet. Drop images into <code className="font-mono">media-source/skill-icons/</code>{" "}
        and run <code className="font-mono">npm run icons:build</code>.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-2">
      {entries.map((entry) => {
        const matches = matchesBySkill.get(entry.id) ?? [];
        const isSelected = selectedSkillId === entry.id;
        const matchSummary =
          matches.length === 0
            ? "No listed projects yet."
            : `${matchCountLabel(matches.length)}.`;
        const groupSummary = groupedCadSkillIds.has(entry.id) ? "CAD group. " : "";
        const actionLabel = isSelected
          ? `${entry.name}. ${groupSummary}${matchSummary} Selected. Activate to clear.`
          : `${entry.name}. ${groupSummary}${matchSummary} Select to show project links.`;

        return (
          <li key={entry.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={actionLabel}
                  aria-pressed={isSelected}
                  aria-controls="skill-project-results"
                  onClick={() => onSelect(entry.id)}
                  className={`group flex size-20 flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                      : "border-border bg-card/40 hover:border-primary hover:bg-card"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center">
                    <img
                      src={entry.url}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                  <span
                    className={`line-clamp-2 text-[10px] leading-tight ${
                      isSelected
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {entry.name}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={8}
                className="border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
              >
                <SkillPreview skill={entry} matches={matches} />
              </TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}

function SkillResults({
  skill,
  matches,
  onClear,
}: {
  skill: IconEntry | null;
  matches: ProjectReference[];
  onClear: () => void;
}) {
  return (
    <div
      id="skill-project-results"
      aria-live="polite"
      className="mt-8 rounded-lg border border-border bg-card/40 p-4 sm:p-5"
    >
      {skill ? (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-medium">
                Projects using{" "}
                {groupedCadSkillIds.has(skill.id) ? "CAD tools" : skill.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {matchCountLabel(matches.length)}
              </p>
              {groupedCadSkillIds.has(skill.id) ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Grouped across Fusion 360, AutoCAD, Inventor, Onshape, and SolidWorks.
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClear}
              className="rounded border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear
            </button>
          </div>

          {matches.length > 0 ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {matches.map(({ project, category, href }) => (
                <li key={`${category}-${project.title}`}>
                  <a
                    href={href}
                    className="group flex h-full items-start justify-between gap-3 rounded-md border border-border bg-background/50 p-3 transition-colors hover:border-primary hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {category}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-foreground">
                        {project.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No listed projects use this skill yet.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Select a skill to see the personal and team projects where I used it.
        </p>
      )}
    </div>
  );
}

export function SkillIcons({
  personalProjects,
  teamProjects,
}: {
  personalProjects: Project[];
  teamProjects: Project[];
}) {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const matchesBySkill = useMemo(() => {
    const projectReferences: ProjectReference[] = [
      ...personalProjects.map((project) => ({
        project,
        category: "Personal" as const,
        href: `/#${projectSlug(project.title)}`,
      })),
      ...teamProjects.map((project) => ({
        project,
        category: "Team" as const,
        href: `/team#${projectSlug(project.title)}`,
      })),
    ];

    return new Map(
      allSkillEntries.map((skill) => [
        skill.id,
        projectReferences.filter(({ project }) => matchesSkill(project, skill)),
      ]),
    );
  }, [personalProjects, teamProjects]);

  const selectedSkill =
    allSkillEntries.find((skill) => skill.id === selectedSkillId) ?? null;
  const selectedMatches = selectedSkill
    ? (matchesBySkill.get(selectedSkill.id) ?? [])
    : [];

  const handleSelect = (skillId: string) => {
    setSelectedSkillId((currentSkillId) =>
      currentSkillId === skillId ? null : skillId,
    );
  };

  return (
    <TooltipProvider delayDuration={150}>
      <p className="mb-5 text-sm text-muted-foreground">
        Hover or focus for a quick preview, or select a skill to explore the projects where I
        used it.
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-medium text-foreground">{group.title}</h3>
            <IconGrid
              entries={group.entries}
              matchesBySkill={matchesBySkill}
              selectedSkillId={selectedSkillId}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>
      <SkillResults
        skill={selectedSkill}
        matches={selectedMatches}
        onClear={() => setSelectedSkillId(null)}
      />
    </TooltipProvider>
  );
}
