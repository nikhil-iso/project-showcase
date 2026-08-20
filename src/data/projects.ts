import type { Project } from "../components/ProjectList";
import { media } from "../lib/media";

export const personalProjects: Project[] = [
  {
    title: "USST.ca Website Rebuild",
    description:
      "Solo rebuild of the University of Saskatchewan Space Design Team's public website, turning it into a responsive, maintainable content platform with a custom admin CMS, project galleries, and Supabase-backed content.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "TanStack Query",
      "Vercel",
    ],
    links: [
      { label: "Live Site", href: "https://www.usst.ca" },
      { label: "GitHub", href: "https://github.com/usst-president/usst-website-rebuild" },
    ],
    details: [
      {
        type: "text",
        content:
          "I rebuilt USST.ca as a solo software project for the University of Saskatchewan Space Design Team. The goal was to replace the team's old web presence with a modern, responsive site that could clearly present our rocketry and CubeSat projects, history, news, sponsors, and recruitment information.",
      },
      {
        type: "image",
        ...media.usstWebsiteHome,
        caption: "Figure 1: Rebuilt USST.ca homepage and primary project and recruiting calls to action.",
      },
      {
        type: "text",
        content:
          "I built the frontend with React, TypeScript, Vite, Tailwind CSS, and reusable shadcn-style components. The site includes dedicated pages for projects, project details, the team, news, recruiting, and sponsors, with shared navigation, theming, responsive layouts, and interactive project media galleries.",
      },
      {
        type: "image",
        ...media.usstWebsiteProjects,
        caption: "Figure 2: Projects page rendering database-backed project and subsystem information.",
      },
      {
        type: "text",
        content:
          "To make the site maintainable after launch, I connected it to Supabase and created a lightweight admin CMS for news posts, team history, projects, sponsors, and gallery media. Public content is read from PostgreSQL through the Supabase client, while protected updates and alumni mailing-list submissions are handled by Edge Functions. The admin flow uses a shared password, rate-limited login attempts, expiring session tokens, and server-side content writes.",
      },
      {
        type: "image",
        ...media.usstWebsiteAdminCms,
        caption:
          "Figure 3: Custom admin CMS for managing news, team history, projects, sponsors, and gallery media.",
      },
      {
        type: "text",
        content:
          "This was my first full website rebuild and taught me how the pieces of a production web application fit together: component design, routing, responsive styling, database schemas, storage, authentication, content management, deployment, and documentation. More importantly, I learned to design for the people who would maintain the website after me, not only for the visitors viewing it.",
      },
    ],
  },
  {
    title: "ARTS - Amateur Rocketry Telemetry System",
    description:
      "ARTS stands for Amateur Rocketry Telemetry System. It is a data collection system designed for Model and High power rocketry. It utilizes an array of sensors and modules onboard a high power rocket to collect and transmit data to a ground station for interpretation and recovery.",
    tech: ["Teensy 4.1", "Arduino", "PlatformIO", "C++", "MPU6050", "BME280", "I2C", "SD Logging"],
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
    tech: ["ESP32", "Arduino", "C++", "Python", "KiCad", "Fusion 360", "DS3231", "MOSFET"],
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
    tech: ["Arduino", "Python", "OpenCV", "Motor Control", "Embedded Systems"],
    details: [
        { type: "text", content: "Pipeline is split into independent detection, tracking, and actuation stages so each can be swapped or tuned in isolation. Currently focused on getting reliable tracking of moving targets under varying lighting before integrating the motor control stage." },
        { type: "text", content: "Long-term goal is a small-scale demonstrator inspired by Carbon Robotics' laser weeder - pattern recognition driving a 2-axis aiming mechanism." },
    ],
  },
];

export const teamProjects: Project[] = [
  {
    title: 'Project "Theseus" - USST Rocketry (President & Propulsion Lead)',
    description:
      "Redesign of the team's M-class rocket for Launch Canada 2026. Composite boat tail development, threaded external motor retention, thrust plate with clean load path into fuselage, structural FEA at 8 kN thrust loads. 26-person team.",
    tech: ["SolidWorks", "Fusion 360", "ANSYS FEA", "OpenRocket", "MATLAB", "Composites", "PETG Tooling", "CNC"],
    links: [{ label: "usst.ca", href: "https://www.usst.ca" }],
    details: [
      {
        type: "text",
        content:
          "As President I run a 50+ person team across two projects, a University Rocketry team and CUBICS Cube Satelite program.",
      },
      { type: "image",
        ...media.usstAgmPicture,
        caption: "Figure 1: USST Team Picture at our Annual General Meeting."
      },
      {
        type: "text",
        content:
          "As Propulsion Lead on the rocketry project I primarily focus in on the aft-end design, which includes a carbon fiber composite boat tail, custom CNC'd Aluminum motor retention, and a custom aluminum thrust plate that transfers ~8 kN cleanly into the fuselage.",
      },
      {
        type: "image",
        ...media.projectTheseusBoatTailShell,
        caption:
          "Figure 2: Project Theseus non-woven fiberglass and epoxy boat tail shell after removal from the PETG tooling.",
      },
      {
        type: "text",
        content:
          "A major part of my current work is learning composite manufacturing by building a full-scale boat tail shell test article. This shell is made from non-woven fiberglass and epoxy resin, and it serves two purposes: it is a manufacturing trial for the final Project Theseus boat tail process, and it can become a backup shell if later iterations do not meet schedule or quality requirements.",
      },
      {
        type: "text",
        content:
          "For this first run, I tore the non-woven fiberglass into small, thin patches, placed them over a 3D printed PETG mold, and wet them out with fiberglass resin. I built the cone layer by layer with overlapping patches so the material could conform to the truncated cone geometry. After roughly 20 minutes of working time, a second 3D printed PETG cone was pressed over the first mold, sandwiching the composite between the two printed tools. That two-part press formed the final truncated cone and gave the exterior edge a flatter, cleaner face than an open hand layup would have produced.",
      },
      {
        type: "video",
        ...media.projectTheseusBoatTailShellVideo,
        caption:
          "Figure 3: Post-removal look at the Project Theseus composite boat tail shell test article.",
      },
      {
        type: "text",
        content:
          "The same aft-end architecture also depends on machined aluminum hardware. The thrust plate and threaded boat tail skeleton provide the motor retention interface, transfer thrust into the airframe, and give the composite shell a repeatable mounting surface. These photos show the manufactured hardware during post-flight and post-fit inspection, including the threaded interface, witness marks, and fin support tabs.",
      },
      {
        type: "image",
        ...media.projectTheseusThrustPlatePostFlight,
        caption: "Figure 4: Project Theseus machined thrust plate after post-flight inspection.",
      },
      {
        type: "image",
        ...media.projectTheseusBoatTailSkeletonThrustPlate,
        caption:
          "Figure 5: Boat tail skeleton and thrust plate assembled, showing the threaded motor-retention interface and support tabs.",
      },
      {
        type: "image",
        ...media.projectTheseusBoatTailSkeletonThrustPlateDetail,
        caption:
          "Figure 6: Close-up of the boat tail skeleton and thrust plate interface, showing thread engagement and post-flight witness marks.",
      },
      {
        type: "image",
        ...media.projectTheseusBoatTailSkeletonManufactured,
        caption:
          "Figure 7: Manufactured boat tail skeleton with internal threads and fin support tabs.",
      },
      { type: "image", ...media.usstRocketryLogo, caption: "Figure 8: USST Rocketry." },
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
    links: [{ label: "usst.ca", href: "https://www.usst.ca" }],
    details: [
      {
        type: "text",
        content:
          "Project UP was my first university-level aerospace project with the University of Saskatchewan Space Design Team. My scope was the mechanical design, manufacturing, and testing of the aft-end propulsion interface: the region where motor thrust enters the airframe, the fins are structurally supported, the motor is retained, and much of the rocket's base drag is created.",
      },
      {
        type: "image",
        ...media.projectUpLowerAssembly,
        caption: "Figure 1: Annotated section view of the Project UP lower propulsion assembly.",
      },
      {
        type: "text",
        content:
          "I treated the aft end as a system-level problem rather than three independent parts. The design had to reduce base drag, provide a clean thrust load path into the fuselage, make motor installation repeatable and serviceable, and preserve stability by controlling the axial motor position. Those requirements competed with each other, so the work became an integration exercise across aerodynamics, structures, manufacturing, and launch operations.",
      },
      {
        type: "image",
        ...media.projectUpLowerAnnotated,
        caption: "Figure 2: Annotated Project UP lower propulsion section layout.",
      },
      {
        type: "text",
        content:
          "For drag reduction, I designed a fiberglass/epoxy boat tail shell that transitioned from the airframe diameter down toward the motor exhaust diameter. The goal was to reduce the low-pressure wake behind the rocket without introducing a steep angle that could separate flow and add turbulence. I used the Rayleigh drag relationship as a first-order check on base-area reduction so the added manufacturing complexity had a quantitative performance rationale.",
      },
      {
        type: "image",
        ...media.projectUpLowerSection,
        caption: "Figure 3: The first iteration of the lower propulsion section CAD showing the aft-end interface with noticible tradeoffs with weight vs preformance.",
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
        ...media.projectUpLaunchVideo,
        caption: "Figure 4: Project UP launch at Launch Canada 2025.",
      },
      {
        type: "image",
        ...media.projectUpBoatTailDamage,
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
        ...media.frc4627Logo,
        caption: "Figure 1: FRC 4627 Manning Robotics logo.",
      },
      {
        type: "text",
        content:
          "Used motor curves and Excel-based modeling to pick gear ratios that hit our acceleration and top-speed targets without browning out the system under defense.",
      },
      {
        type: "image",
        ...media.frc4627Thor,
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
        ...media.skillsBot,
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
