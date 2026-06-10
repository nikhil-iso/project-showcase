#!/usr/bin/env node
// Convert raw skill icons from `media-source/skill-icons/<category>/*`
// into optimized webp files at `src/assets/skill-icons/<category>/*.webp`.
//
// Drop PNG/JPG/SVG/WEBP files into the source category folders, then run:
//   npm run icons:build
//
// The filename (sans extension) becomes the display name on the site.
// Use lowercase + dashes, e.g. `fusion-360.png` -> "Fusion 360".

import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const canonicalSourceRoot = path.join(root, "media-source", "skill-icons");
const outputRoot = path.join(root, "src", "assets", "skill-icons");
let sourceRoot = canonicalSourceRoot;

const MAX_SIZE = 256; // px on the longest edge
const QUALITY = 88;

const VALID_INPUTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".tiff", ".avif", ".svg"]);
const RAW_INPUTS = new Set([...VALID_INPUTS].filter((ext) => ext !== ".webp"));

async function exists(p) {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
}

async function hasRawIconSources(rootDir) {
  if (!(await exists(rootDir))) return false;

  const categories = await getCategoryNames(rootDir);
  for (const category of categories) {
    const files = await readdir(path.join(rootDir, category)).catch(() => []);
    if (files.some((file) => RAW_INPUTS.has(path.extname(file).toLowerCase()))) {
      return true;
    }
  }
  return false;
}

async function getCategoryNames(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function processCategory(category) {
  const srcDir = path.join(sourceRoot, category);
  const outDir = path.join(outputRoot, category);
  if (!(await exists(srcDir))) return { category, count: 0 };

  await mkdir(outDir, { recursive: true });

  // Clear any stale webp outputs so renamed/removed source files don't linger.
  const existing = await readdir(outDir).catch(() => []);
  await Promise.all(
    existing
      .filter((f) => f.endsWith(".webp"))
      .map((f) => rm(path.join(outDir, f), { force: true })),
  );

  const files = (await readdir(srcDir)).filter((f) =>
    VALID_INPUTS.has(path.extname(f).toLowerCase()),
  );

  let count = 0;
  for (const file of files) {
    const inPath = path.join(srcDir, file);
    const base = path.basename(file, path.extname(file)).toLowerCase();
    const outPath = path.join(outDir, `${base}.webp`);
    await sharp(inPath, { density: 384 })
      .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: 100 })
      .toFile(outPath);
    count += 1;
    console.log(`  ${category}/${file} -> ${path.relative(root, outPath)}`);
  }
  return { category, count };
}

async function main() {
  if (!(await exists(canonicalSourceRoot))) {
    if (await hasRawIconSources(outputRoot)) {
      sourceRoot = outputRoot;
      console.log(`Source directory not found: ${canonicalSourceRoot}`);
      console.log(
        `Using existing raw icons in ${path.relative(root, outputRoot)} as a fallback.\n`,
      );
    } else {
      console.error(`Source directory not found: ${canonicalSourceRoot}`);
      console.error(
        "Add images to media-source/skill-icons/<category>/, then run `npm run icons:build`.",
      );
      process.exit(1);
    }
  }

  const categories = await getCategoryNames(sourceRoot);
  console.log(`Building skill icons from ${path.relative(root, sourceRoot)}...`);
  const results = await Promise.all(categories.map(processCategory));
  const total = results.reduce((n, r) => n + r.count, 0);
  console.log(`\nDone. ${total} icon(s) written to ${path.relative(root, outputRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
