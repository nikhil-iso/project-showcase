import { createFileRoute } from "@tanstack/react-router";
import { ProjectList, type Project } from "../components/ProjectList";
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

const teamProjects: Project[] = [
  {
    title: 'Project "Theseus" - USST Rocketry (President & Propulsion Lead)',
    description:
      "Redesign of the team's M-class rocket for Launch Canada 2026. Composite boat tail, threaded external motor retention, thrust plate with clean load path into fuselage, structural FEA at 8 kN thrust loads. 26-person team.",
    tech: ["SolidWorks", "Fusion 360", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "CNC"],
    links: [{ label: "USST Website", href: "https://www.usst.ca" }],
    details: [
      {
        type: "text",
        content:
          "As President I run a 50+ person team across two projects, a University Rocketry team and CUBICS Cube Satelite program.",
      },
      { type: "image", 
        src: "USST_AGM_Picture.JPG", 
        alt: "USST Team Picture", 
        caption: "Figure 1: USST Team Picture at our Annual General Meeting." 
      },
      {
        type: "text",
        content:
          "As Propulsion Lead on the rocketry project I primarily focus in on the aft-end design, which includes a carbon fiber composite boat tail, custom CNC'd Aluminum motor retention, and a custom aluminum thrust plate that transfers ~8 kN cleanly into the fuselage.",
      },
      { type: "image", 
        src: "USST_Rocketry_Logo.jpg", 
        alt: "USST Rocketry", 
        caption: "Figure 1: USST Rocketry." 
      },
      {
        type: "text",
        content:
          "Structural validation is done through ANSYS at peak thrust loads, with hand calculations for bolted joints and bonded interfaces. Targeting Launch Canada 2026.",
      },
    ],
  },
  {
    title: 'Project "UP" - USST Rocketry (Propulsion Lead)',
    description:
      "M-class high-power rocket launched by USST Rocketry at Launch Canada 2025. I led the aft-end propulsion interface: a fiberglass composite boat tail, machined 6061 aluminum thrust plate, and threaded external motor-retention crown. The rocket reached 16,500 ft, placed 8th nationally, and the team won the Spirit Bear Award for team spirit, community, and sportsmanship.",
    tech: [
      "SolidWorks",
      "ANSYS FEA",
      "OpenRocket",
      "MATLAB",
      "Fiberglass/Epoxy",
      "6061 Aluminum",
      "CNC",
    ],
    links: [{ label: "USST Website", href: "https://www.usst.ca" }],
    details: [
      {
        type: "text",
        content:
          "Project UP was my first university-level aerospace project with the University of Saskatchewan Space Design Team. My scope was the mechanical design, manufacturing, and testing of the aft-end propulsion interface: the region where motor thrust enters the airframe, the fins are structurally supported, the motor is retained, and much of the rocket's base drag is created.",
      },
      {
        type: "image",
        src: "/Project Up Lower Assembly Section View Annotated.png",
        alt: "Annotated section view of the Project UP lower propulsion assembly",
        caption: "Figure 1: Annotated section view of the Project UP lower propulsion assembly.",
      },
      {
        type: "text",
        content:
          "I treated the aft end as a system-level problem rather than three independent parts. The design had to reduce base drag, provide a clean thrust load path into the fuselage, make motor installation repeatable and serviceable, and preserve stability by controlling the axial motor position. Those requirements competed with each other, so the work became an integration exercise across aerodynamics, structures, manufacturing, and launch operations.",
      },
      {
        type: "image",
        src: "/Project UpLower Section Annotated.png",
        alt: "Annotated Project UP lower propulsion section layout",
        caption: "Figure 2: Annotated Project UP lower propulsion section layout.",
      },
      {
        type: "text",
        content:
          "For drag reduction, I designed a fiberglass/epoxy boat tail shell that transitioned from the airframe diameter down toward the motor exhaust diameter. The goal was to reduce the low-pressure wake behind the rocket without introducing a steep angle that could separate flow and add turbulence. I used the Rayleigh drag relationship as a first-order check on base-area reduction so the added manufacturing complexity had a quantitative performance rationale.",
      },
      {
        type: "image",
        src: "/Project Up Lower Section.png",
        alt: "Project UP lower propulsion section CAD",
        caption: "Figure 3: Lower propulsion section CAD showing the aft-end interface.",
      },
      {
        type: "text",
        content:
          "The boat tail was built as a manual hand layup over a 3D printed mold using knitted fiberglass and low-viscosity epoxy resin. It also had to integrate with the structural hardware instead of acting as a cosmetic fairing, so the shell-and-skeleton concept tied the aerodynamic surface back into the thrust plate and motor-retention hardware.",
      },
      {
        type: "text",
        content:
          "For motor retention, I designed a threaded external crown that interfaces with the thrust plate through large-diameter threads. This replaced harder-to-access internal retention approaches, improving serviceability during motor installation and removal while still giving a vibration-resistant axial retention path. The crown also served as a structural interface for the boat tail, which kept the aerodynamic and retention hardware aligned around one integrated aft-end architecture.",
      },
      {
        type: "text",
        content:
          "The thrust plate was the main structural component in the load path. I developed multiple plate concepts, including versions that could work with or without the boat tail, to reduce program risk if the aerodynamic design proved too costly or complex. The final 6061 aluminum thrust plate used a projecting tube to set motor position and interface geometry while avoiding unintended thrust transfer into non-structural fin-cage connections. The intent was for axial motor thrust to pass cleanly through the plate and into the bonded composite fuselage.",
      },
      {
        type: "text",
        content:
          "The final aft-end assembly flew on USST's M-class rocket at Launch Canada 2025. The rocket reached 16,500 ft compared with the 12,300 ft prediction cited in my project portfolio, an approximately 34% higher achieved apogee, and finished 8th nationally. The recovered boat tail showed real landing damage after lodging into wood, which made the flight a useful validation point for both the performance value and the practical durability limits of the composite aft-end design.",
      },
      {
        type: "video",
        src: "/Project Up Launch Video.mp4",
        alt: "Project UP launch video",
        caption: "Figure 4: Project UP launch at Launch Canada 2025.",
      },
      {
        type: "image",
        src: "/Project Up Boat Tail Damage.jpg",
        alt: "Recovered Project UP boat tail damage after landing",
        caption: "Figure 5: Recovered Project UP boat tail damage after landing.",
      },
    ],
  },
  {
    title: "FRC 4627 Manning Robotics - Drivetrain Lead",
    description:
      "Led drivetrain architecture for the 2023 FRC season. Developed the team's first swerve drive prototype alongside an 8:1 dual tank drive. Torque-speed and gear ratio analysis using motor data sheets and Excel-based modeling. 40-person team.",
    tech: ["SolidWorks", "Excel", "Swerve Drive", "Gear Ratio Optimization"],
    links: [{ label: "Team 4627", href: "https://4627.ca/" }],
    details: [
      {
        type: "text",
        content:
          "Led drivetrain architecture for a 40-person FRC team in the 2023 season. Built the team's first swerve drive prototype while shipping an 8:1 dual tank drive as the competition-ready fallback.",
      },
      {
        type: "image",
        src: "/4627logo.png",
        alt: "FRC 4627 Manning Robotics logo",
        caption: "Figure 1: FRC 4627 Manning Robotics logo.",
      },
      {
        type: "text",
        content:
          "Used motor curves and Excel-based modeling to pick gear ratios that hit our acceleration and top-speed targets without browning out the system under defense.",
      },
      {
        type: "image",
        src: "/4627Thor.png",
        alt: "FRC 4627 Thor robot CAD render",
        caption: "Figure 2: FRC 4627 Thor robot CAD render.",
      },
    ],
  },
  {
    title: "Skills Alberta Robotics 2023 - Mechanical & Systems Lead",
    description:
      "3rd place provincially. Coordinated two-robot system: a mechanum-drive shooter and a dedicated collector bot. Focused on project management, repeatable scoring, and rapid prototyping under competition timelines.",
    tech: ["Mechanum Drive", "Mechanical Design", "Embedded Control"],
    details: [
      {
        type: "text",
        content:
          "Two-robot strategy: a mechanum-drive shooter optimized for repeatable scoring, paired with a lower-profile collector bot feeding it game pieces. Splitting roles let each robot stay simple and reliable.",
      },
      {
        type: "image",
        src: "/skillsbot.JPG",
        alt: "Skills Alberta Shooter robot CAD render",
        caption: "Figure 1: Skills Alberta Shooter bot CAD render.",
      },
      {
        type: "text",
        content:
          "Finished 3rd place provincially. Most of the build time was spent iterating on intake geometry and shooter alignment under tight competition timelines.",
      },
    ],
  },
  {
    title: "NASA Space Apps Challenge 2024 - ExoSpace",
    description:
      "48-hour hackathon build. We developed a web platform for exploring NASA's open data with map-first navigation, filterable exoplanet attributes, and accessibility-first explanations. Led product framing and dataset curation.",
    tech: ["JavaScript", "HTML/CSS", "NASA Exoplanet Archive", "Data Visualization"],
    links: [{ label: "Space Apps Challenge", href: "https://www.asc-csa.gc.ca/eng/events/2024/2024-10-05-space-apps-challenge.asp" }],
    details: [
      {
        type: "text",
        content:
          "During the 48-hour hackathon our project used the NASA Exoplanet Archive that is an openly accessible database. We built a map style interface for exploring exoplanets with filters across mass, radius, orbital period, and discovery method.",
      },
      {
        type: "text",
        content:
          "My role was product framing and dataset curation - picking which fields actually told a story and writing accessibility-first explanations so non-astronomers could navigate the data and learn from this tool.",
      },
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
