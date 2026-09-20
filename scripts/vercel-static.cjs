#!/usr/bin/env node
/**
 * This branch is the already-built site. Vercel was pointed at gh-pages and ran
 * `vite build`, which needs source files and a vite binary that are not here.
 * Copy the published files into dist, and optionally install a `vite` shim so a
 * dashboard override that still runs `vite build` succeeds.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skip = new Set(["dist", ".git", "node_modules", ".vercel"]);

function copyToDist() {
  const dest = path.join(root, "dist");
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(root)) {
    if (skip.has(name)) continue;
    fs.cpSync(path.join(root, name), path.join(dest, name), { recursive: true });
  }
}

function installViteShim() {
  const bin = path.join(root, "node_modules", ".bin");
  fs.mkdirSync(bin, { recursive: true });
  const shim = path.join(bin, "vite");
  const body = "#!/usr/bin/env node\nrequire(" + JSON.stringify(path.join(root, "scripts", "vercel-static.cjs")) + ");\n";
  fs.writeFileSync(shim, body);
  fs.chmodSync(shim, 0o755);
}

if (process.argv.includes("--install-vite")) installViteShim();
else copyToDist();
