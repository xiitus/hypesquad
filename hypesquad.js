#!/usr/bin/env node

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// --- Named constants ---

export const HouseId = Object.freeze({
  Bravery: 1,
  Brilliance: 2,
  Balance: 3,
});

const Argv = Object.freeze({
  EntryScriptIndex: 1,
  ScriptArgsOffset: 2,
});

const TokenMask = Object.freeze({
  VisiblePrefixLength: 4,
});

const CharOffset = Object.freeze({
  LastChar: -1,
});

const Slice = Object.freeze({
  FromStart: 0,
});

const ExitCode = Object.freeze({
  Failure: 1,
});

const StringLength = Object.freeze({
  Empty: 0,
});

const Clamp = Object.freeze({
  Floor: 0,
});

export const HttpStatus = Object.freeze({
  NoContent: 204,
});

// --- Domain constants ---

const HOUSES = {
  bravery: HouseId.Bravery,
  brilliance: HouseId.Brilliance,
  balance: HouseId.Balance,
};

const HOUSE_NAMES = Object.keys(HOUSES);
const VALID_ACTIONS = [...HOUSE_NAMES, "remove"];
const API = "https://discord.com/api/v9/hypesquad/online";
const STATUS_LABELS = {
  [HttpStatus.NoContent]: "No Content",
};

// --- Pure functions ---

export const parseAction = (flags) => {
  const house = HOUSE_NAMES.find((name) => flags.includes(`--${name}`));
  if (house) return house;
  return flags.includes("--remove") ? "remove" : null;
};

export const parseFlags = (argv) => {
  const flags = argv.slice(Argv.ScriptArgsOffset);
  const action = parseAction(flags);
  return action ? { action, dryRun: flags.includes("--dry-run") } : null;
};

export const buildRequest = (action, token) => {
  const headers = { Authorization: token, "Content-Type": "application/json" };
  if (action === "remove") return { method: "DELETE", headers };
  return { method: "POST", headers, body: JSON.stringify({ house_id: HOUSES[action] }) };
};

export const expectedStatusForAction = (_action) =>
  HttpStatus.NoContent;

export const isExpectedStatus = (action, status) =>
  status === expectedStatusForAction(action);

export const maskToken = (token) =>
  `${token.slice(Slice.FromStart, TokenMask.VisiblePrefixLength)}${"*".repeat(Math.max(Clamp.Floor, token.length - TokenMask.VisiblePrefixLength))}`;

export const formatDryRun = (action, token, opts) => {
  const lines = [`[DRY RUN] ${opts.method} ${API}`, `  Action: ${action}`, `  Token: ${maskToken(token)}`];
  if (opts.body !== undefined) lines.push(`  Body: ${opts.body}`);
  return lines.join("\n");
};

export const formatResult = (action, result) =>
  result.ok ? `Done: ${action === "remove" ? "Removed" : `Set to ${action}`} (${result.status})` : `Failed (${result.status}): ${result.body}`;

export const formatFailure = ({ body, expectedStatus }) => {
  const summary = `Unexpected response status. Expected ${expectedStatus} ${STATUS_LABELS[expectedStatus] ?? "Success"}.`;
  const details = body.trim();
  return details ? `${summary} Response: ${details}` : summary;
};

export const usageMessage = () =>
  `Usage: npx hypesquad --<${VALID_ACTIONS.join("|")}> [--dry-run]`;

// --- IO boundary ---

const BACKSPACE_CHARS = new Set(["\x7f", "\b"]);
const ENTER_CHARS = new Set(["\r", "\n"]);

const handleBackspace = (buf) => {
  if (buf.length === StringLength.Empty) return buf;
  process.stderr.write("\b \b");
  return buf.slice(Slice.FromStart, CharOffset.LastChar);
};

const appendChar = (buf, ch) => {
  process.stderr.write("*");
  return buf + ch;
};

const keyDispatch = (ch) => {
  if (ENTER_CHARS.has(ch)) return (buf, _ch, done) => { done(buf); return buf; };
  if (BACKSPACE_CHARS.has(ch)) return (buf) => handleBackspace(buf);
  return (buf, value) => appendChar(buf, value);
};

const handleKeyInput = (ch, buf, done) => {
  if (ch === "\x03") process.exit(ExitCode.Failure);
  return keyDispatch(ch)(buf, ch, done);
};

const readSecret = (prompt) =>
  new Promise((resolveSecret) => {
    process.stderr.write(prompt);
    let buf = "";
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const done = (value) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stderr.write("\n");
      resolveSecret(value.trim());
    };
    process.stdin.on("data", (ch) => { buf = handleKeyInput(ch, buf, done); });
  });

const runDryRun = (parsed, token) => {
  const opts = buildRequest(parsed.action, token);
  console.log(formatDryRun(parsed.action, token, opts));
};

const execute = async (parsed, token) => {
  const opts = buildRequest(parsed.action, token);
  const { body: reqBody, ...init } = opts;
  const res = await fetch(API, { ...init, body: reqBody ?? null });
  const ok = isExpectedStatus(parsed.action, res.status);
  const body = ok ? "" : formatFailure({
    body: await res.text(),
    expectedStatus: expectedStatusForAction(parsed.action),
  });
  console.log(formatResult(parsed.action, { ok, status: res.status, body }));
};

const abort = (msg) => {
  console.error(msg);
  process.exit(ExitCode.Failure);
};

const requireToken = async () => {
  const token = await readSecret("Discord token: ");
  return token || abort("Token is required.");
};

export const run = async (parsed, token) =>
  parsed.dryRun ? runDryRun(parsed, token) : execute(parsed, token);

export const isMainModule = (metaUrl, argv) => {
  const entry = argv[Argv.EntryScriptIndex];
  return entry !== undefined && resolve(entry) === fileURLToPath(metaUrl);
};

export const main = async () => {
  const parsed = parseFlags(process.argv) ?? abort(usageMessage());
  const token = await requireToken();
  await run(parsed, token);
};

if (isMainModule(import.meta.url, process.argv)) {
  await main();
}
