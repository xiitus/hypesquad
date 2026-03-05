#!/usr/bin/env node
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const script = resolve(__dirname, "..", "hypesquad.ts");

execFileSync("npx", ["tsx", script, ...process.argv.slice(2)], { stdio: "inherit" });
