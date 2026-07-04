#!/usr/bin/env node
/* eslint-disable no-console */

const { spawn } = require("node:child_process");
const { networkInterfaces, platform } = require("node:os");

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  const val = process.argv[idx + 1];
  if (!val || val.startsWith("--")) return undefined;
  return val;
}

function getLanIPv4() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family !== "IPv4") continue;
      if (net.internal) continue;
      return net.address;
    }
  }
  return undefined;
}

const host = process.env.HOSTNAME || getArgValue("--host") || "0.0.0.0";
// Default 3000 — matches preview/smoke-test scripts.
const port = process.env.PORT || getArgValue("--port") || "3000";

function stopExistingListenerOnPort(portNumber) {
  if (process.platform === "win32") return;
  try {
    const { execSync } = require("node:child_process");
    const pids = execSync(`lsof -ti :${portNumber}`, { encoding: "utf8" }).trim();
    if (!pids) return;
    for (const pid of pids.split("\n")) {
      if (!pid) continue;
      try {
        process.kill(Number(pid), "SIGTERM");
      } catch {
        /* already exited */
      }
    }
    console.log(`[dev] Stopped previous process on port ${portNumber}`);
  } catch {
    /* nothing listening */
  }
}

stopExistingListenerOnPort(port);
const openUrl = process.env.OPEN_URL !== "0";
const lanIp = getLanIPv4();
if (lanIp) console.log(`  - Network:      http://${lanIp}:${port}`);

const nextBin = require.resolve("next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "dev", "--hostname", host, "--port", port], {
  stdio: ["inherit", "pipe", "pipe"],
  env: process.env,
});

let opened = false;
function maybeOpenFromLine(line) {
  if (!openUrl || opened) return;
  const lower = line.toLowerCase();
  const looksReady =
    lower.includes("ready") ||
    lower.includes("started server") ||
    lower.includes("local:") ||
    lower.includes("http://localhost");
  if (!looksReady) return;

  opened = true;
  const url = `http://localhost:${port}`;

  // Fire-and-forget; keep dev server in foreground.
  if (platform() === "darwin") {
    spawn("open", [url], { stdio: "ignore" }).unref();
  } else if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", url], { stdio: "ignore" }).unref();
  } else {
    spawn("xdg-open", [url], { stdio: "ignore" }).unref();
  }
}

function forward(stream, write) {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    write(chunk);
    for (const line of chunk.split(/\r?\n/)) maybeOpenFromLine(line);
  });
}

forward(child.stdout, (s) => process.stdout.write(s));
forward(child.stderr, (s) => process.stderr.write(s));

child.on("exit", (code) => process.exit(code ?? 0));

