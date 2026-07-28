import { createFileRoute } from "@tanstack/react-router";
import { ProjectList } from "../components/ProjectList";
import { teamProjects } from "../data/projects";
import { canonicalUrl } from "../lib/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Projects - Nikhil Patel" },
      {
        name: "description",
        content: "Team and competition projects: rocketry, FRC robotics, and hackathons.",
      },
      { property: "og:title", content: "Team Projects - Nikhil Patel" },
      {
        property: "og:description",
        content: "Team and competition projects: rocketry, FRC robotics, and hackathons.",
      },
      { property: "og:url", content: canonicalUrl("/team") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/team") }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">Team Projects</h1>
        <ProjectList projects={teamProjects} />
      </div>
    </div>
  );
}
