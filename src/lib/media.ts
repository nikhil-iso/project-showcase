export type ImageMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VideoMedia = {
  src: string;
  alt: string;
  poster?: string;
};

const blobBaseUrl = "https://brimskad4uzhfbfd.public.blob.vercel-storage.com";

function image(path: string, alt: string, width: number, height: number): ImageMedia {
  return {
    src: `${blobBaseUrl}/portfolio/images/${path}`,
    alt,
    width,
    height,
  };
}

function video(path: string, alt: string, poster?: string): VideoMedia {
  return {
    src: `${blobBaseUrl}/portfolio/videos/${path}`,
    alt,
    poster,
  };
}

export const media = {
  profile: image("profile.webp", "Nikhil Patel profile picture", 512, 683),
  usstWelcomeWeekBooth: image("usst-welcome-week-booth.webp", "USST Welcome Week booth", 1200, 1514),
  artsPrototype: image("arts-prototype.webp", "ARTS_prototype", 1200, 1304),
  artsPrototypeVideo: video("arts-prototype-video.mp4", "ARTS_protoboard_vid"),
  simuLightBanner: image("simulight-banner.webp", "SimuLight Sunrise project banner", 1200, 240),
  sunriseBreadboard: image("sunrise-breadboard.webp", "SimuLight Sunrise breadboard prototype", 1096, 1096),
  simuLightPcb: image("simulight-pcb.webp", "SimuLight Sunrise PCB layout", 1200, 1200),
  simuLightPcb3d: image("simulight-pcb-3d.webp", "SimuLight Sunrise PCB 3D render", 1200, 1200),
  macroKeyboardBanner: image("macro-keyboard-banner.webp", "Arduino macropad project banner", 1200, 288),
  macropadOriginalCad: image("macropad-original-cad.webp", "Original macropad enclosure CAD render", 1200, 703),
  macropadRotaryCad: image(
    "macropad-rotary-cad.webp",
    "Macropad version with rotary encoders and Cherry MX Blue switches",
    1200,
    675,
  ),
  macropadInternalCad: image(
    "macropad-internal-cad.webp",
    "Macropad internal CAD render with Pro Micro and heat-set inserts",
    1200,
    675,
  ),
  macropadHeatPressJig: image(
    "macropad-heat-press-jig.webp",
    "Temporary drill press jig used to install heat-set inserts in the macropad enclosure",
    1200,
    2128,
  ),
  macropadDryFit: image(
    "macropad-dry-fit.webp",
    "Macropad switches and wiring dry-fit inside the enclosure",
    1200,
    677,
  ),
  macropadEncoderWiring: image(
    "macropad-encoder-wiring.webp",
    "Macropad interior after installing rotary encoders and wiring",
    1200,
    677,
  ),
  usstAgmPicture: image("usst-agm-picture.webp", "USST Team Picture", 1200, 800),
  usstRocketryLogo: image("usst-rocketry-logo.webp", "USST Rocketry", 1200, 608),
  projectUpLowerAssembly: image(
    "project-up-lower-assembly.webp",
    "Annotated section view of the Project UP lower propulsion assembly",
    1200,
    1047,
  ),
  projectUpLowerAnnotated: image(
    "project-up-lower-annotated.webp",
    "Annotated Project UP lower propulsion section layout",
    1200,
    753,
  ),
  projectUpLowerSection: image("project-up-lower-section.webp", "Project UP lower propulsion section CAD", 517, 517),
  projectUpLaunchVideo: video("project-up-launch-video.mp4", "Project UP launch video"),
  projectUpBoatTailDamage: image(
    "project-up-boat-tail-damage.webp",
    "Recovered Project UP boat tail damage after landing",
    1200,
    1600,
  ),
  frc4627Logo: image("frc-4627-logo.webp", "FRC 4627 Manning Robotics logo", 178, 225),
  frc4627Thor: image("frc-4627-thor.webp", "FRC 4627 Thor robot CAD render", 1200, 567),
  skillsBot: image("skills-bot.webp", "Skills Alberta Shooter robot CAD render", 1105, 829),
} satisfies Record<string, ImageMedia | VideoMedia>;
