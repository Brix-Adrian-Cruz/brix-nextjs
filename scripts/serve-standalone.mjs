// Serves the production build the way Pantheon does.
//
// `next start` does not work with `output: 'standalone'` — it prints a warning
// and can serve stale output, which looks exactly like a broken deploy. The
// standalone build is a self-contained server in .next/standalone, but the
// build deliberately leaves out public/ and .next/static so the platform can
// serve them from its own CDN. Locally we copy them in first.

import { cpSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");
const server = path.join(standalone, "server.js");

if (!existsSync(server)) {
  console.error("No standalone build found. Run `npm run build` first.");
  process.exit(1);
}

for (const [from, to] of [
  [path.join(root, "public"), path.join(standalone, "public")],
  [path.join(root, ".next", "static"), path.join(standalone, ".next", "static")],
]) {
  if (existsSync(from)) cpSync(from, to, { recursive: true });
}

spawn(process.execPath, [server], { stdio: "inherit", cwd: standalone })
  .on("exit", (code) => process.exit(code ?? 0));
