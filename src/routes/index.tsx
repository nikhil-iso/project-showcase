import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ProjectList, type Project } from "../components/ProjectList";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Patel - Electrical Engineering Portfolio" },
      { name: "description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:title", content: "Nikhil Patel - Electrical Engineering Portfolio" },
      { property: "og:description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
    ],
  }),
  component: Index,
});

const personalProjects: Project[] = [
  {
    title: "ARTS - Amateur Rocketry Telemetry System",
    description:
      "ARTS stands for Amateur Rocketry Telemetry System. It is a data collection system designed for Model and High power rocketry. It utilizes an array of sensors and modules onboard a high power rocket to collect and transmit data to a ground station for interpretation and recovery.",
    tech: ["Teensy 4.1", "PlatformIO", "C++", "MPU6050", "BME280", "I2C", "SD Logging"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/MRFC" }],
    details: [
        { type: "text", content: "I started ARTS as a stepping stone into the avionics side of high and mid power rocketry. Most of my work on the USST has been in rocketry propulsion, and as propulsion lead I do not usually get to spend much time working directly with electrical engineering fields even though that is what I am studying. ARTS is a way for me to bring that side of rocketry closer to my own studies and knowledge." },
        { type: "image", src: "/usst_welcome_week_booth.jpg", alt: "USST Welcome Week booth", caption: "Figure 1: USST Welcome Week booth (Thats me on the far right!)" },
        { type: "text", content: "The main part of ARTS is the MRFC, or model rocket flight computer. This is the board that flies inside the rocket and records what the vehicle is doing during flight. It uses sensors like a BMP280 (barometric pressure), KX134 accelerometer, GPS, and TMP102 temperature sensor. The barometer measures air pressure, which can be used to estimate altitude through some simple math. An accelerometer measures how the rocket is moving in three dimensional space and what loads it sees during boost, coast, deployment, and landing. It also provided orientation which will be usefull later with more advanced systems. GPS gives position data, which is useful for recovery and for comparing the actual flight to what was predicted before launch." },
        { type: "image", src: "public/ARTS_prototype.jpg", alt: "ARTS_prototype", caption: "Figure 2: ARTS flight computer MRFC Protoboard layout during testing and verification prior to permanant component placement." },
        { type: "text", content: "The ground station is the recieving side of the system. While the MRFC is in the rocket, the ground station stays on the ground and receives telemetry over radio. Telemetry is live data being sent back from the rocket, such as altitude, GPS position, battery state, and flight status. This makes the system more useful during testing, because I am not only waiting until after recovery to see what happened. It also gives me a base for future work in prediction, live plotting, and comparing flight data against a model." },
        { type: "text", content: "A longer-term part of ARTS is learning the pieces that support GNC systems. GNC stands for guidance, navigation, and control. Guidance is deciding where the vehicle should go, navigation is estimating where it is, and control is making changes so the vehicle follows the intended path. ARTS is not meant to start as a full active control system, but the basics are the same: reliable sensors, good data logging, telemetry, and some way of estimating the rocket’s state during flight." },
        { type: "text", content: "I am also interested in this because I hope to build USask’s first hybrid rocket engine for my final engineering capstone. A hybrid engine uses a solid fuel and a liquid or gaseous oxidizer, so the electrical side becomes more involved than on a simple solid motor flight. You need instrumentation, control of valves or ignition systems, data logging, and a good understanding of how the engine and vehicle behave together. ARTS gives me a way to build that background before taking on a larger propulsion system." },        
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
        { type: "text", content: "Uses the Arduino Micro's native USB HID stack so the device enumerates as a standard keyboard - no drivers required on any major OS. The 4×2 matrix is scanned with debounce in firmware, and macros are stored in EEPROM so profiles survive power cycles." },
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
        { type: "text", content: "Long-term goal is a small-scale demonstrator inspired by Carbon Robotics' laser weeder - pattern recognition driving a 2-axis aiming mechanism." },
    ],
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <header className="mb-16 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight">Nikhil Patel</h1>
            <p className="mt-2 text-muted-foreground">
              Electrical Engineering student at the University of Saskatchewan. <br />
               <br />
              Rocketry, embedded systems, robotics, prosthesis and hardware design.
            </p>
            <nav className="mt-5 flex flex-wrap gap-3 text-base">
              <a
                href="mailto:nikhil.patel@usask.ca"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                Email
              </a>
              <a
                href="https://github.com/nikhil-iso"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-patel-ba1581281/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
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
            I&apos;m an Electrical Engineering student at the{" "}
            <span className="text-[#0b6a41]">University of Saskatchewan</span> based in
            Saskatoon, SK. I like working on problems that deal with a mix of hardware and software.
            Things like rocketry, space systems and structures, embedded systems, and robotics are where I see myself. <br /><br />
            
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
