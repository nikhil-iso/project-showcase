import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ProjectList, type Project } from "../components/ProjectList";
import { media } from "../lib/media";
import { canonicalUrl } from "../lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Patel - Electrical Engineering Portfolio" },
      { name: "description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:title", content: "Nikhil Patel - Electrical Engineering Portfolio" },
      { property: "og:description", content: "Electrical Engineering student at the University of Saskatchewan. Rocketry, embedded systems, robotics, and hardware design." },
      { property: "og:url", content: canonicalUrl("/") },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
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
        { type: "image", ...media.usstWelcomeWeekBooth, caption: "Figure 1: USST Welcome Week booth (Thats me on the far right!)" },
        { type: "text", content: "The main part of ARTS is the MRFC, or model rocket flight computer. This is the board that flies inside the rocket and records what the vehicle is doing during flight. It uses sensors like a BMP280 (barometric pressure), KX134 accelerometer, GPS, and TMP102 temperature sensor. The barometer measures air pressure, which can be used to estimate altitude through some simple math. An accelerometer measures how the rocket is moving in three dimensional space and what loads it sees during boost, coast, deployment, and landing. It also provided orientation which will be usefull later with more advanced systems. GPS gives position data, which is useful for recovery and for comparing the actual flight to what was predicted before launch." },
        { type: "image", ...media.artsPrototype, caption: "Figure 2: ARTS flight computer MRFC Protoboard layout during testing and verification prior to permanant component placement." },
        { type: "text", content: "The ground station is the recieving side of the system. While the MRFC is in the rocket, the ground station stays on the ground and receives telemetry over radio. Telemetry is live data being sent back from the rocket, such as altitude, GPS position, battery state, and flight status. This makes the system more useful during testing, because I am not only waiting until after recovery to see what happened. It also gives me a base for future work in prediction, live plotting, and comparing flight data against a model." },
        { type: "video", ...media.artsPrototypeVideo, caption: "Figure 3: ARTS flight computer MRFC Protoboard layout post after GPS upgrade + Soldered." },
        { type: "text", content: "A longer-term part of ARTS is learning the pieces that support GNC systems. GNC stands for guidance, navigation, and control. Guidance is deciding where the vehicle should go, navigation is estimating where it is, and control is making changes so the vehicle follows the intended path. ARTS is not meant to start as a full active control system, but the basics are the same: reliable sensors, good data logging, telemetry, and some way of estimating the rocket’s state during flight." },
        { type: "text", content: "I am also interested in this because I hope to build USask’s first hybrid rocket engine for my final engineering capstone. A hybrid engine uses a solid fuel and a liquid or gaseous oxidizer, so the electrical side becomes more involved than on a simple solid motor flight. You need instrumentation, control of valves or ignition systems, data logging, and a good understanding of how the engine and vehicle behave together. ARTS gives me a way to build that background before taking on a larger propulsion system." },        
    ],
  },
  {
    title: "SimuLight Sunrise",
    description:
      "First-year engineering project that uses an ESP32, DS3231 RTC, and 12V light bar to make dark Saskatoon mornings a little easier.",
    tech: ["ESP32", "C++", "Python", "KiCad", "Fusion 360", "DS3231", "MOSFET"],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/SimulightSunrise" }],
    details: [
        { type: "text", content: "SimuLight Sunrise started in my first year of engineering because my dorm room window faced a wall... Even during the day, I did not get much direct sunlight. In the middle of a Saskatoon winter, that meant I was usually waking up before there was any real sunrise at all." },
        { type: "image", ...media.simuLightBanner, caption: "Figure 1: SimuLight Sunrise project banner." },
        { type: "text", content: "The idea was to build something better than a loud alarm. I wanted the room to slowly get brighter before I had to wake up, closer to how a normal sunrise feels. It was partly a comfort project, but also a good excuse to build something practical with embedded hardware." },
        { type: "text", content: "The device is built around an ESP32, a DS3231 real-time clock module, a MOSFET breakout board,and an old 12V LED light bar. The ESP32 handles the control logic, Wi-Fi, web interface, and smart home connection. The RTC keeps time even if the device loses internet, which matters when the whole point is making sure the alarm still works." },
        { type: "image", ...media.sunriseBreadboard, caption: "Figure 2: SimuLight Sunrise breadboard prototype." },
        { type: "text", content: "It works like this, the user sets a wake time and a ramp length online. When the alarm starts, the LED array slowly increases brightness over that period instead of turning on all at once. I also added a web interface so I could adjust schedules, brightness behavior, and profiles without plugging the device into a computer every time." },
        { type: "text", content: "I built it with smart home use in mind, so different routines can trigger different profiles. A weekday wake-up could use a long slow ramp, while a weekend profile could be shorter or dimmer. I also started adding weather-aware behavior so the light timing can eventually respond to conditions from a connected weather app." },
        { type: "text", content: "The physical device includes a 4-digit 7-segment display so it can still work as a normal desk clock. The electronics and firmware are very much a prototype proof of concept, and the last major step is putting everything into a proper enclosure so it feels like a finished device instead of a bench prototype." },
        { type: "image", ...media.simuLightPcb, caption: "Figure 3: SimuLight Sunrise PCB layout." },
        { type: "image", ...media.simuLightPcb3d, caption: "Figure 4: SimuLight Sunrise PCB 3D render." },
    ],
  },
  {
    title: "Arduino-Based Macropad",
    description:
      "Revisited 8-key Arduino Pro Micro macropad with two rotary encoders, Cherry MX Blue switches, cleaner firmware, and a smaller screw-fastened 3D printed enclosure.",
    tech: [
      "Arduino Micro",
      "C++",
      "USB HID",
      "Cherry MX Blue",
      "Rotary Encoders",
      "Fusion 360",
      "3D Printing",
    ],
    links: [{ label: "GitHub", href: "https://github.com/nikhil-iso/Arduino-Macropad" }],
    details: [
        { type: "text", content: "I started this project in Grade 11 during COVID. At the time I wanted to get my foot in the door with accessible engineering projects, and I remember hearing about a group that was helping people with disabilities enjoy gaming by building custom input devices. That stuck with me, and this macropad became my first real engineering project." },
        { type: "image", ...media.macroKeyboardBanner, caption: "Figure 1: Arduino macropad project banner." },
        { type: "text", content: "The original design was an 8-key macropad built around an Arduino Pro Micro and a 3D printed friction-fit case. It was simple on purpose, and at the time it was my first real experience with soldering, 3D printing, and writing Arduino code. Most of the project was me learning the basics by building something I could actually use." },
        { type: "image", ...media.macropadOriginalCad, caption: "Figure 2: Original macropad enclosure CAD render." },
        { type: "text", content: "Four years later I am revisiting the same project and improving it in the places that bothered me after actually using it. The new version keeps the 8-key layout, but adds two rotary encoders and switches to Cherry MX Blue switches. The Blue switches give a much clickier sound and stronger key feedback, which makes the board feel more intentional instead of just being a row of buttons." },
        { type: "image", ...media.macropadRotaryCad, caption: "Figure 3: Updated macropad layout with rotary encoders and Cherry MX Blue switches." },
        { type: "text", content: "The rotary encoders are also a nice touch because they let me experiment with alternate input types instead of only using actuation based inputs. A switch is basically on or off, but an encoder can be turned, clicked, mapped to volume, brightness, scrolling, timeline control, or whatever else makes sense. It made the project feel more like a flexible input device rather than just a small keyboard." },
        { type: "text", content: "I also redesigned the enclosure to be more space effective. The new housing shrinks the overall dimensions by roughly 30% while still keeping room for the switches, encoders, wiring, and Arduino Pro Micro. The older case worked, but it had a lot of unused volume and felt more like a first-pass print than a finished device." },
        { type: "image", ...media.macropadInternalCad, caption: "Figure 4: Internal layout with the Pro Micro and heat-set inserts visible." },
        { type: "text", content: "One of the bigger mechanical changes is the use of heat-set inserts in the top half of the case. The bottom half now fastens to the top with screws, which makes the housing consistently serviceable. The old friction-fit design was fine for a prototype, but after opening it too many times the fit started to wear out. The screw and insert design makes it much easier to take apart, fix, and put back together without slowly damaging the enclosure." },
        { type: "image", ...media.macropadHeatPressJig, caption: "Figure 5: Temporary drill press jig for installing heat-set inserts square and flush." },
        { type: "text", content: "To install the heat-set screw inserts repeatably, I made a temporary press from a soldering iron with the heat-set attachment mounted onto a drill press. The jig kept the insert aligned at 90 degrees to the printed component which gave me controlled vertical travel, so each insert could be set flush without tilting or melting the surrounding plastic." },
        { type: "image", ...media.macropadDryFit, caption: "Figure 6: Switches and wiring dry-fit before final assembly." },
        { type: "text", content: "Before final soldering and closure, I dry-fit the switches and wiring inside the smaller enclosure to make sure the internal routing still cleared the Pro Micro, encoder bodies, and screw bosses. That check helped catch smaller issues while the case was still easy to adjust." },
        { type: "image", ...media.macropadEncoderWiring, caption: "Figure 7: Interior after adding the rotary encoders and wiring." },
        { type: "text", content: "After the rotary encoders were added, the internal layout became a tighter wiring problem. The final routing keeps the encoder leads and switch matrix accessible while preserving enough clearance for the screw-fastened enclosure to close cleanly." },
        { type: "text", content: "The code is also being cleaned up so it is easier to understand and modify. The board still acts like a standard USB keyboard for plug-n-play use, but the key mappings and encoder behavior are being organized in a way that makes future changes less messy. It is still the same project at its core, just revisited with a few more years of experience and a better idea of what I would change if I built it again." },
    ],
  },
  {
    title: "OpenCV Detection Platform",
    description:
      "In-progress computer vision platform that detects patterns through a webcam and drives motors to point at the target. Inspired by Carbon Robotics' laser weeder. Modular detection, tracking, and actuation stages. https://www.youtube.com/watch?v=1fOMy7PcSgg",
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
      <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-8">
        <header className="mb-16 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <Avatar className="h-32 w-32 shrink-0 border border-border bg-muted md:h-48 md:w-48">
            <AvatarImage
              src={media.profile.src}
              alt={media.profile.alt}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-medium">NP</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-center md:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">Nikhil Patel</h1>
            <p className="mt-2 text-muted-foreground">
              Electrical Engineering student at the University of Saskatchewan. <br />
               <br />
              Rocketry, embedded systems, robotics, prosthesis and hardware design.
            </p>
            <nav className="mt-5 flex flex-wrap justify-center gap-3 text-base md:justify-start">
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
                href="https://www.linkedin.com/in/nikhil-patel-uofs/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-border px-3 py-1.5 text-primary hover:border-primary hover:no-underline"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <p className="leading-relaxed">
            I&apos;m an Electrical Engineering student at the{" "}
            <span className="text-[#0b6a41]">University of Saskatchewan</span> based in
            Saskatoon, SK. I like working on problems that deal with a mix of hardware and software.
            Things like rocketry, space systems and structures, embedded systems, and robotics particularly interest me. <br /><br />
            
            Currently focusing on academics and personal projects. Still open to opportunities and projects in electrical and mechatronics engineering.
            { /* Currently open to internships, co-op positions, and collaborative projects in electrical engineering and mechatronics. */}

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
          <div className="grid gap-6 text-sm leading-relaxed md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-medium text-foreground">Engineering Tools</h3>
              <p className="text-muted-foreground">
                Fusion 360, KiCAD, Inventor, ANSYS FEA, OpenRocket, 
                Sketchup, Reviet, Civil 3D, Solidworks, OnShape, AutoCAD
                Solidworks, 3D Printing, CNC Machining, Composite Manufacturing
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Programming Languages</h3>
              <p className="text-muted-foreground">
                C/C++, Excel, MATLAB, Python, HTML, CSS, JavaScript,
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Platforms</h3>
              <p className="text-muted-foreground">
                Vercel, GitHub, MC Projects, Autodesk,
                PlatformIO, Arduino, ESP32, Teensy, Git, Linux,
                Google Suite, MS Office,
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nikhil Patel. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
