import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ProjectList, type Project } from "../components/ProjectList";

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

const personalProjects: Project[] = [
  {
    title: "MRFC — Modular Rocket Flight Computer",
    description:
      "PlatformIO firmware prototype for Teensy 4.1 that validates IMU and barometric sensor performance, streams filtered CSV telemetry over USB serial, and logs boot sessions to onboard SD. Calibrates a ground-pressure baseline at startup and signals init via buzzer.",
    tech: ["Teensy 4.1", "PlatformIO", "C++", "MPU6050", "BME280", "I2C", "SD Logging"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/MRFC" }],
    details: [
        { type: "text", content: "Designed as a modular base for future rocket avionics: separate driver modules for the IMU, barometer, and storage so new sensors can be added without touching the main loop." },
        { type: "text", content: "Ground pressure is sampled and averaged at boot to set a baseline for altitude calculations. Telemetry is streamed as CSV over USB serial for live debugging and mirrored to SD for post-flight review. A piezo buzzer reports init status and sensor errors so failures are caught before launch." },
    ],
  },
  {
    title: "SimuLight Sunrise",
    description:
      "Open-source sunrise alarm clock that gradually ramps room brightness using Bezier-style easing over 30–90 minute windows. ESP32 + DS3231 RTC fallback, MOSFET-driven 12V load, JSON scheduling, and a Python desktop utility for ramp profile tuning.",
    tech: ["ESP32", "C++", "Python", "KiCad", "Fusion 360", "DS3231", "MOSFET"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/SimulightSunrise" }],
    details: [
        { type: "text", content: "ESP32 firmware drives a high-side MOSFET via PWM to dim a 12V LED panel, with a DS3231 RTC as a fallback when Wi-Fi time sync is unavailable. Schedules are stored as JSON so multiple alarm profiles can coexist." },
        { type: "text", content: "A Python desktop utility lets you tune ramp profiles visually and push them to the device. KiCad schematic and a Fusion 360 enclosure round out the build into something repeatable." },
    ],
  },
  {
    title: "Arduino-Based Macropad",
    description:
      "Low-cost, customizable macro keypad on an Arduino Micro with native USB HID. 4×2 hot-swap Cherry MX matrix, multi-profile macro storage, per-key remapping, and an ergonomic 3D-printed enclosure. Driverless on Windows, macOS, and Linux.",
    tech: ["Arduino Micro", "C++", "USB HID", "Cherry MX", "Fusion 360", "3D Printing"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/Arduino-Macropad" }],
    details: [
        { type: "text", content: "Uses the Arduino Micro's native USB HID stack so the device enumerates as a standard keyboard — no drivers required on any major OS. The 4×2 matrix is scanned with debounce in firmware, and macros are stored in EEPROM so profiles survive power cycles." },
        { type: "text", content: "The enclosure was modeled in Fusion 360 with hot-swap sockets in mind, so switches can be changed without soldering. Total BOM was under $40." },
    ],
  },
  {
    title: "OpenCV Detection Platform",
    description:
      "In-progress computer vision platform that detects patterns through a webcam and drives motors to point at the target. Inspired by Carbon Robotics' laser weeder. Modular detection, tracking, and actuation stages.",
    tech: ["Python", "OpenCV", "Motor Control", "Embedded Systems"],
    details: [
        { type: "text", content: "Pipeline is split into independent detection, tracking, and actuation stages so each can be swapped or tuned in isolation. Currently focused on getting reliable tracking of moving targets under varying lighting before integrating the motor control stage." },
        { type: "text", content: "Long-term goal is a small-scale demonstrator inspired by Carbon Robotics' laser weeder — pattern recognition driving a 2-axis aiming mechanism." },
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-16 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight">Nikhil Patel</h1>
            <p className="mt-2 text-muted-foreground">
              Electrical Engineering student at the University of Saskatchewan. <br />
               <br />
              Rocketry, embedded systems, robotics, prosthesis and hardware design.
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
          </div>
          <Avatar className="h-48 w-48 border border-border bg-muted">
            <AvatarImage
              src="/profile-picture.JPG"
              alt="Nikhil Patel profile picture"
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-medium">NP</AvatarFallback>
          </Avatar>
        </header>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="leading-relaxed">
            I&apos;m an Electrical Engineering student at the University of Saskatchewan based in
            Saskatoon, SK. I like working on problems that deal with hardware and software. \
            Things like rocketry propulsion and structures, embedded systems, and robotics. <br /><br />
            
            Currently open to internships, co-op positions, and collaborative projects in electrical 
            engineering and mechatronics.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Personal Projects
          </h2>
          <ProjectList projects={personalProjects} />
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
          © {new Date().getFullYear()} Nikhil Patel. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
