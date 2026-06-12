import { copyFile, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "media-source");
const outputDir = path.join(root, "media-dist");
const imageDir = path.join(outputDir, "images");
const videoDir = path.join(outputDir, "videos");

const imageAssets = [
  {
    key: "profile",
    source: "profile-picture.JPG",
    output: "profile.webp",
    maxWidth: 512,
    quality: 82,
  },
  {
    key: "usstWelcomeWeekBooth",
    source: "usst_welcome_week_booth.jpg",
    output: "usst-welcome-week-booth.webp",
  },
  {
    key: "artsPrototype",
    source: "ARTS_prototype.jpg",
    output: "arts-prototype.webp",
  },
  {
    key: "simuLightBanner",
    source: "SimuLight Wide Banner Website.png",
    output: "simulight-banner.webp",
  },
  {
    key: "sunriseBreadboard",
    source: "Sunrise Alarm Breadboard image.jpg",
    output: "sunrise-breadboard.webp",
  },
  {
    key: "simuLightPcb",
    source: "SimuLightPCB.png",
    output: "simulight-pcb.webp",
  },
  {
    key: "simuLightPcb3d",
    source: "SimuLightPCB3D.png",
    output: "simulight-pcb-3d.webp",
  },
  {
    key: "macroKeyboardBanner",
    source: "MacroKeyboard Banner Website.png",
    output: "macro-keyboard-banner.webp",
  },
  {
    key: "macropadOriginalCad",
    source: "Macropad V2 (WIP) v10.png",
    output: "macropad-original-cad.webp",
  },
  {
    key: "macropadRotaryCad",
    source: "Macropad V5 v8 with rotary encoders.png",
    output: "macropad-rotary-cad.webp",
  },
  {
    key: "macropadInternalCad",
    source: "Macropad V5 v8 heat press inserts and pro micro and inside visible .png",
    output: "macropad-internal-cad.webp",
  },
  {
    key: "macropadHeatPressJig",
    source: "Macropad Heat press Jig.jpg",
    output: "macropad-heat-press-jig.webp",
  },
  {
    key: "macropadDryFit",
    source: "Macropad wires and switches dry fit.jpg",
    output: "macropad-dry-fit.webp",
  },
  {
    key: "macropadEncoderWiring",
    source: "Macropad insides after adding encoders.jpg",
    output: "macropad-encoder-wiring.webp",
  },
  {
    key: "usstAgmPicture",
    source: "USST_AGM_Picture.JPG",
    output: "usst-agm-picture.webp",
  },
  {
    key: "usstRocketryLogo",
    source: "USST_Rocketry_Logo.jpg",
    output: "usst-rocketry-logo.webp",
  },
  {
    key: "projectUpLowerAssembly",
    source: "Project Up Lower Assembly Section View Annotated.png",
    output: "project-up-lower-assembly.webp",
  },
  {
    key: "projectUpLowerAnnotated",
    source: "Project UpLower Section Annotated.png",
    output: "project-up-lower-annotated.webp",
  },
  {
    key: "projectUpLowerSection",
    source: "Project Up Lower Section.png",
    output: "project-up-lower-section.webp",
  },
  {
    key: "projectUpBoatTailDamage",
    source: "Project Up Boat Tail Damage.jpg",
    output: "project-up-boat-tail-damage.webp",
  },
  {
    key: "projectTheseusBoatTailShell",
    source: "Project Theseus Boat Tail Shell Composite Post Removal.jpg",
    output: "project-theseus-boat-tail-shell.webp",
  },
  {
    key: "frc4627Logo",
    source: "4627logo.png",
    output: "frc-4627-logo.webp",
  },
  {
    key: "frc4627Thor",
    source: "4627Thor.png",
    output: "frc-4627-thor.webp",
  },
  {
    key: "skillsBot",
    source: "skillsbot.JPG",
    output: "skills-bot.webp",
  },
];

const videoAssets = [
  {
    key: "artsPrototypeVideo",
    source: "PXL_20260528_100750046.mp4",
    output: "arts-prototype-video.mp4",
  },
  {
    key: "projectUpLaunchVideo",
    source: "Project Up Launch Video.mp4",
    output: "project-up-launch-video.mp4",
  },
  {
    key: "projectTheseusBoatTailShellVideo",
    source: "Project Theseus Boat Tail Shell Post Removal Video.mp4",
    output: "project-theseus-boat-tail-shell-post-removal-video.mp4",
  },
];

async function ensureSourceFiles() {
  const missing = [];

  for (const asset of [...imageAssets, ...videoAssets]) {
    try {
      await stat(path.join(sourceDir, asset.source));
    } catch {
      missing.push(asset.source);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing media-source files:\n${missing.map((name) => `- ${name}`).join("\n")}`);
  }
}

async function emptyDir(dir) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
}

async function optimizeImages() {
  const manifest = {};

  for (const asset of imageAssets) {
    const input = path.join(sourceDir, asset.source);
    const output = path.join(imageDir, asset.output);
    const quality = asset.quality ?? 78;
    const maxWidth = asset.maxWidth ?? 1200;

    const image = sharp(input).rotate();
    const metadata = await image.metadata();
    const targetWidth = metadata.width && metadata.width > maxWidth ? maxWidth : metadata.width;

    const optimized = await image
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);

    manifest[asset.key] = {
      type: "image",
      output: `images/${asset.output}`,
      pathname: `portfolio/images/${asset.output}`,
      width: optimized.width,
      height: optimized.height,
    };
  }

  return manifest;
}

async function copyVideos() {
  const manifest = {};

  for (const asset of videoAssets) {
    const output = path.join(videoDir, asset.output);
    await copyFile(path.join(sourceDir, asset.source), output);
    manifest[asset.key] = {
      type: "video",
      output: `videos/${asset.output}`,
      pathname: `portfolio/videos/${asset.output}`,
    };
  }

  return manifest;
}

async function listOutputSizes() {
  const entries = [];

  for (const dir of [imageDir, videoDir]) {
    const names = await readdir(dir);
    for (const name of names) {
      const file = path.join(dir, name);
      const stats = await stat(file);
      entries.push({ file: path.relative(outputDir, file).replaceAll("\\", "/"), bytes: stats.size });
    }
  }

  return entries.sort((a, b) => b.bytes - a.bytes);
}

await ensureSourceFiles();
await emptyDir(imageDir);
await emptyDir(videoDir);

const manifest = {
  generatedAt: new Date().toISOString(),
  assets: {
    ...(await optimizeImages()),
    ...(await copyVideos()),
  },
  files: await listOutputSizes(),
};

await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const totalBytes = manifest.files.reduce((sum, file) => sum + file.bytes, 0);
console.log(`Optimized ${manifest.files.length} files to media-dist (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
