#!/usr/bin/env node
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { launchCli } from "./launcher.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const script = resolve(__dirname, "..", "hypesquad.js");

try {
  launchCli({
    argv: process.argv.slice(2),
    script,
    node: "node",
  });
} catch (error) {
  process.exit(typeof error?.status === "number" ? error.status : 1);
}
