import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "media-dist");
const manifestPath = path.join(outputDir, "manifest.json");
const cacheControlMaxAge = "2678400";

const cli = process.platform === "win32" ? "npx.cmd" : "npx";

async function loadLocalEnv() {
  try {
    const text = await readFile(path.join(root, ".env.local"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

      const [key, ...valueParts] = trimmed.split("=");
      const allowedEnvKeys = new Set([
        "BLOB_READ_WRITE_TOKEN",
        "BLOB_STORE_ID",
        "VERCEL_ENV",
        "VERCEL_OIDC_TOKEN",
        "VERCEL_TARGET_ENV",
      ]);

      if (allowedEnvKeys.has(key) && !process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // The CLI can still work when env vars are already present in the shell.
  }
}

function run(args) {
  const env = { ...process.env };
  if (env.VERCEL_OIDC_TOKEN && env.BLOB_STORE_ID) {
    delete env.BLOB_READ_WRITE_TOKEN;
  }

  return new Promise((resolve, reject) => {
    const child = spawn(cli, args, {
      cwd: root,
      env,
      stdio: "inherit",
      shell: false,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${cli} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

await loadLocalEnv();

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const assets = Object.entries(manifest.assets);

const hasReadWriteToken =
  process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN.length > 20;
const hasOidcCredentials = process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID;
const authArgs = hasOidcCredentials
  ? ["--oidc-token", process.env.VERCEL_OIDC_TOKEN, "--store-id", process.env.BLOB_STORE_ID]
  : [];

if (!hasReadWriteToken && !hasOidcCredentials) {
  throw new Error(
    "No usable Vercel Blob credentials found. Run `vercel env pull .env.local --yes --environment=production` after connecting the Blob store.",
  );
}

if (!hasOidcCredentials && hasReadWriteToken) {
  console.warn(
    "Using legacy BLOB_READ_WRITE_TOKEN. Run `vercel env pull .env.local --yes --environment=production` after redeploying the project to upload with OIDC instead.",
  );
}

for (const [key, asset] of assets) {
  const file = path.join(outputDir, asset.output);
  console.log(`Uploading ${key}: ${asset.pathname}`);
  await run([
    "--yes",
    "vercel@latest",
    "blob",
    ...authArgs,
    "put",
    file,
    "--pathname",
    asset.pathname,
    "--access",
    "public",
    "--cache-control-max-age",
    cacheControlMaxAge,
  ]);
}

console.log(`Uploaded ${assets.length} media files.`);
