import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Patel — Electrical Engineering Portfolio" },
      { name: "description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:title", content: "Nikhil Patel — Electrical Engineering Portfolio" },
      { property: "og:description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
    ],
  }),
  component: Index,
});

type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

const personalProjects: Project[] = [
  {
    title: "MRFC — Modular Rocket Flight Computer",
    description:
      "PlatformIO firmware prototype for Teensy 4.1 that validates IMU and barometric sensor performance, streams filtered CSV telemetry over USB serial, and logs boot sessions to onboard SD. Calibrates a ground-pressure baseline at startup and signals init via buzzer.",
    tech: ["Teensy 4.1", "PlatformIO", "C++", "MPU6050", "BME280", "I2C", "SD Logging"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/MRFC" }],
  },
  {
    title: "SimuLight Sunrise",
    description:
      "Open-source sunrise alarm clock that gradually ramps room brightness using Bezier-style easing over 30–90 minute windows. ESP32 + DS3231 RTC fallback, MOSFET-driven 12V load, JSON scheduling, and a Python desktop utility for ramp profile tuning.",
    tech: ["ESP32", "C++", "Python", "KiCad", "Fusion 360", "DS3231", "MOSFET"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/SimulightSunrise" }],
  },
  {
    title: "Arduino-Based Macropad",
    description:
      "Low-cost, customizable macro keypad on an Arduino Micro with native USB HID. 4×2 hot-swap Cherry MX matrix, multi-profile macro storage, per-key remapping, and an ergonomic 3D-printed enclosure. Driverless on Windows, macOS, and Linux.",
    tech: ["Arduino Micro", "C++", "USB HID", "Cherry MX", "Fusion 360", "3D Printing"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/Arduino-Macropad" }],
  },
  {
    title: "OpenCV Detection Platform",
    description:
      "In-progress computer vision platform that detects patterns through a webcam and drives motors to point at the target. Inspired by Carbon Robotics' laser weeder. Modular detection, tracking, and actuation stages.",
    tech: ["Python", "OpenCV", "Motor Control", "Embedded Systems"],
  },
];

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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-16">
          <h1 className="text-3xl font-semibold tracking-tight">Nikhil Patel</h1>
          <p className="mt-2 text-muted-foreground">
            Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design.
          </p>
          <nav className="mt-4 flex gap-4 text-sm">
            <a href="mailto:nikhil.patel@usask.ca" className="text-primary hover:underline">
              Email
            </a>
            <a href="https://github.com/nikhil-iso" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikhil-patel-ba1581281/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              LinkedIn
            </a>
          </nav>
        </header>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="leading-relaxed">
            I&apos;m an Electrical Engineering student at the University of Saskatchewan based in
            Saskatoon, SK. I like working on problems that span hardware and firmware — rocketry
            propulsion and structures, embedded sensor systems, and robotics. Currently open to
            internships, co-op positions, and collaborative projects in electrical engineering and
            mechatronics.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Personal Projects
          </h2>
          <ul className="space-y-8">
            {personalProjects.map((p) => (
              <li key={p.title} className="border-l-2 border-border pl-4">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.tech.join(" · ")}
                </p>
                {p.links && (
                  <div className="mt-2 flex gap-3 text-sm">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Team Projects
          </h2>
          <ul className="space-y-8">
            {teamProjects.map((p) => (
              <li key={p.title} className="border-l-2 border-border pl-4">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.tech.join(" · ")}
                </p>
                {p.links && (
                  <div className="mt-2 flex gap-3 text-sm">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </h2>
          <p className="text-sm leading-relaxed">
            C/C++, Python, JavaScript, MATLAB, PlatformIO, Arduino, ESP32, Teensy, KiCad,
            SolidWorks, Fusion 360, ANSYS FEA, OpenRocket, 3D Printing, CNC Machining,
            Composite Manufacturing, Git, Linux
          </p>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nikhil Patel
        </footer>
      </div>
    </div>
  );
}
