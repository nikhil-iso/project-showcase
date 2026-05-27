import { createFileRoute } from "@tanstack/react-router";
import { ProjectList, type Project } from "../components/ProjectList";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Projects — Nikhil Patel" },
      { name: "description", content: "Team and competition projects: rocketry, FRC robotics, and hackathons." },
      { property: "og:title", content: "Team Projects — Nikhil Patel" },
      { property: "og:description", content: "Team and competition projects: rocketry, FRC robotics, and hackathons." },
    ],
  }),
  component: TeamPage,
});

const teamProjects: Project[] = [
  {
    title: "Project \"Theseus\" — USST Rocketry (President & Propulsion Lead)",
    description:
      "Redesign of the team's M-class rocket for Launch Canada 2026. Composite boat tail, threaded external motor retention, thrust plate with clean load path into fuselage, structural FEA at 8 kN thrust loads. 26-person team.",
    tech: ["SolidWorks", "Fusion 360", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "CNC"],
  },
  {
    title: "Project \"UP\" — USST Rocketry (Propulsion Lead)",
    description:
      "M-class high power rocket at Launch Canada 2025. Led propulsion integration and aft-end subsystem: composite boat tail, aluminum thrust plate, threaded crown motor retention. 8th nationally, 16,500 ft apogee, Spirit Bear Award.",
    tech: ["SolidWorks", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "CNC"],
  },
  {
    title: "FRC 4627 Manning Robotics — Drivetrain Lead",
    description:
      "Led drivetrain architecture for the 2023 FRC season. Developed the team's first swerve drive prototype alongside an 8:1 dual tank drive. Torque-speed and gear ratio analysis using motor data sheets and Excel-based modeling. 40-person team.",
    tech: ["SolidWorks", "Excel", "Swerve Drive", "Gear Ratio Optimization"],
  },
  {
    title: "Skills Alberta Robotics 2023 — Mechanical & Systems Lead",
    description:
      "3rd place provincially. Coordinated two-robot system: a mechanum-drive shooter and a dedicated collector bot. Focused on division of labor, repeatable scoring, and rapid prototyping under competition timelines.",
    tech: ["Mechanum Drive", "Mechanical Design", "Embedded Control"],
  },
  {
    title: "NASA Space Apps Challenge 2024 — ExoSpace",
    description:
      "48-hour hackathon build. Web platform for exploring NASA open data with map-first navigation, filterable exoplanet attributes, and accessibility-first explainers. Led product framing and dataset curation.",
    tech: ["JavaScript", "HTML/CSS", "NASA Exoplanet Archive", "Data Visualization"],
  },
];

function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight">Team Projects</h1>
        <ProjectList projects={teamProjects} />
      </div>
    </div>
  );
}