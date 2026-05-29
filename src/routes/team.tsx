import { createFileRoute } from "@tanstack/react-router";
import { ProjectList, type Project } from "../components/ProjectList";
import { canonicalUrl } from "../lib/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Projects - Nikhil Patel" },
      { name: "description", content: "Team and competition projects: rocketry, FRC robotics, and hackathons." },
      { property: "og:title", content: "Team Projects - Nikhil Patel" },
      { property: "og:description", content: "Team and competition projects: rocketry, FRC robotics, and hackathons." },
      { property: "og:url", content: canonicalUrl("/team") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/team") }],
  }),
  component: TeamPage,
});

const teamProjects: Project[] = [
  {
    title: "Project \"Theseus\" - USST Rocketry (President & Propulsion Lead)",
    description:
      "Redesign of the team's M-class rocket for Launch Canada 2026. Composite boat tail, threaded external motor retention, thrust plate with clean load path into fuselage, structural FEA at 8 kN thrust loads. 26-person team.",
    tech: ["SolidWorks", "Fusion 360", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "CNC"],
    details: [
        { type: "text", content: "As President I run the 26-person team across propulsion, structures, recovery, avionics, and operations. As Propulsion Lead I own the aft-end design: composite boat tail layup, threaded external motor retention, and a machined aluminum thrust plate that transfers ~8 kN cleanly into the fuselage." },
        { type: "text", content: "Structural validation is done in ANSYS at peak thrust loads, with hand calcs for bolted joints and bonded interfaces. Targeting Launch Canada 2026." },
    ],
  },
  {
    title: "Project \"UP\" - USST Rocketry (Propulsion Lead)",
    description:
      "M-class high power rocket at Launch Canada 2025. Led propulsion integration and aft-end subsystem: composite boat tail, aluminum thrust plate, threaded crown motor retention. 8th nationally, 16,500 ft apogee, Spirit Bear Award.",
    tech: ["SolidWorks", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "CNC"],
    details: [
        { type: "text", content: "Owned the propulsion subsystem end-to-end: motor mount tube, centering rings, composite boat tail, thrust plate, and a threaded crown for external motor retention. Coordinated machining and composites scheduling against the team's launch deadline." },
        { type: "text", content: "Results at Launch Canada 2025: 8th place nationally, 16,500 ft apogee, and the Spirit Bear Award for team conduct and collaboration." },
    ],
  },
  {
    title: "FRC 4627 Manning Robotics - Drivetrain Lead",
    description:
      "Led drivetrain architecture for the 2023 FRC season. Developed the team's first swerve drive prototype alongside an 8:1 dual tank drive. Torque-speed and gear ratio analysis using motor data sheets and Excel-based modeling. 40-person team.",
    tech: ["SolidWorks", "Excel", "Swerve Drive", "Gear Ratio Optimization"],
    details: [
        { type: "text", content: "Led drivetrain architecture for a 40-person FRC team in the 2023 season. Built the team's first swerve drive prototype while shipping an 8:1 dual tank drive as the competition-ready fallback." },
        { type: "text", content: "Used motor curves and Excel-based modeling to pick gear ratios that hit our acceleration and top-speed targets without browning out the system under defense." },
    ],
  },
  {
    title: "Skills Alberta Robotics 2023 - Mechanical & Systems Lead",
    description:
      "3rd place provincially. Coordinated two-robot system: a mechanum-drive shooter and a dedicated collector bot. Focused on division of labor, repeatable scoring, and rapid prototyping under competition timelines.",
    tech: ["Mechanum Drive", "Mechanical Design", "Embedded Control"],
    details: [
        { type: "text", content: "Two-robot strategy: a mechanum-drive shooter optimized for repeatable scoring, paired with a lower-profile collector bot feeding it game pieces. Splitting roles let each robot stay simple and reliable." },
        { type: "text", content: "Finished 3rd place provincially. Most of the build time was spent iterating on intake geometry and shooter alignment under tight competition timelines." },
    ],
  },
  {
    title: "NASA Space Apps Challenge 2024 - ExoSpace",
    description:
      "48-hour hackathon build. Web platform for exploring NASA open data with map-first navigation, filterable exoplanet attributes, and accessibility-first explainers. Led product framing and dataset curation.",
    tech: ["JavaScript", "HTML/CSS", "NASA Exoplanet Archive", "Data Visualization"],
    details: [
        { type: "text", content: "48-hour hackathon project using the NASA Exoplanet Archive. Built a map-first interface for exploring exoplanets with filters across mass, radius, orbital period, and discovery method." },
        { type: "text", content: "My role was product framing and dataset curation - picking which fields actually told a story and writing accessibility-first explainers so non-astronomers could navigate the data." },
    ],
  },
];

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
