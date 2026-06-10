#!/usr/bin/env node
// Convert raw skill icons from `media-source/skill-icons/<category>/*`
// into optimized webp files at `src/assets/skill-icons/<category>/*.webp`.
//
// Drop PNG/JPG/SVG/WEBP files into the source category folders, then run:
//   bun run icons:build
//
// The filename (sans extension) becomes the display name on the site.
// Use lowercase + dashes, e.g. `fusion-360.png` -> "Fusion 360".

import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "media-source", "skill-icons");
const outputRoot = path.join(root, "src", "assets", "skill-icons");

const MAX_SIZE = 256; // px on the longest edge
const QUALITY = 88;

const VALID_INPUTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".tiff", ".avif", ".svg"]);

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
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
  if (!(await exists(sourceRoot))) {
    console.error(`Source directory not found: ${sourceRoot}`);
    process.exit(1);
  }
  const categories = (await readdir(sourceRoot)).filter(async (entry) =>
    (await stat(path.join(sourceRoot, entry))).isDirectory(),
  );
  console.log(`Building skill icons from ${path.relative(root, sourceRoot)}...`);
  const results = await Promise.all(categories.map(processCategory));
  const total = results.reduce((n, r) => n + r.count, 0);
  console.log(`\nDone. ${total} icon(s) written to ${path.relative(root, outputRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});