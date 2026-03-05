#!/usr/bin/env tsx

// --- Named constants ---

export const enum HouseId {
  Bravery = 1,
  Brilliance = 2,
  Balance = 3,
}

export const enum Argv {
  ScriptArgsOffset = 2,
}

export const enum TokenMask {
  VisiblePrefixLength = 4,
}

export const enum CharOffset {
  LastChar = -1,
}

export const enum Slice {
  FromStart = 0,
}

export const enum ExitCode {
  Failure = 1,
}

export const enum StringLength {
  Empty = 0,
}

export const enum Clamp {
  Floor = 0,
}

// --- Types ---

export type House = "bravery" | "brilliance" | "balance";
export type Action = House | "remove";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ParsedFlags {
  readonly action: Action;
  readonly dryRun: boolean;
}

export interface RequestOpts {
  readonly method: HttpMethod;
  readonly headers: Readonly<{ Authorization: string; "Content-Type": "application/json" }>;
  readonly body?: string;
}

export interface ApiResult {
  readonly ok: boolean;
  readonly status: number;
  readonly body: string;
}

// --- Domain constants ---

const HOUSES: Readonly<Record<House, HouseId>> = {
  bravery: HouseId.Bravery,
  brilliance: HouseId.Brilliance,
  balance: HouseId.Balance,
};

const HOUSE_NAMES: readonly House[] = Object.keys(HOUSES) as readonly House[];
const VALID_ACTIONS: readonly Action[] = [...HOUSE_NAMES, "remove"];
const API: string = "https://discord.com/api/v9/hypesquad/online";

// --- Pure functions ---

export const parseAction = (flags: readonly string[]): Action | null => {
  const house: House | undefined = HOUSE_NAMES.find((h: House) => flags.includes(`--${h}`));
  if (house) return house;
  return flags.includes("--remove") ? "remove" : null;
};

export const parseFlags = (argv: readonly string[]): ParsedFlags | null => {
  const flags: readonly string[] = argv.slice(Argv.ScriptArgsOffset);
  const action: Action | null = parseAction(flags);
  return action ? { action, dryRun: flags.includes("--dry-run") } : null;
};

export const buildRequest = (action: Action, token: string): RequestOpts => {
  const headers: Readonly<{ Authorization: string; "Content-Type": "application/json" }> = { Authorization: token, "Content-Type": "application/json" } as const;
  if (action === "remove") return { method: "DELETE", headers };
  return { method: "POST", headers, body: JSON.stringify({ house_id: HOUSES[action] }) };
};

export const maskToken = (token: string): string =>
  `${token.slice(Slice.FromStart, TokenMask.VisiblePrefixLength)}${"*".repeat(Math.max(Clamp.Floor, token.length - TokenMask.VisiblePrefixLength))}`;

export const formatDryRun = (action: Action, token: string, opts: RequestOpts): string => {
  const lines: string[] = [`[DRY RUN] ${opts.method} ${API}`, `  Action: ${action}`, `  Token: ${maskToken(token)}`];
  if (opts.body !== undefined) lines.push(`  Body: ${opts.body}`);
  return lines.join("\n");
};

export const formatResult = (action: Action, result: ApiResult): string =>
  result.ok ? `Done: ${action === "remove" ? "Removed" : `Set to ${action}`} (${result.status})` : `Failed (${result.status}): ${result.body}`;

export const usageMessage = (): string =>
  `Usage: npx hypesquad --<${VALID_ACTIONS.join("|")}> [--dry-run]`;

// --- IO boundary ---

const BACKSPACE_CHARS: ReadonlySet<string> = new Set(["\x7f", "\b"]);
const ENTER_CHARS: ReadonlySet<string> = new Set(["\r", "\n"]);

const handleBackspace = (buf: string): string => {
  if (buf.length === StringLength.Empty) return buf;
  process.stderr.write("\b \b");
  return buf.slice(Slice.FromStart, CharOffset.LastChar);
};

const appendChar = (buf: string, ch: string): string => {
  process.stderr.write("*");
  return buf + ch;
};

type DoneCallback = (buf: string) => void;
type KeyHandler = (buf: string, ch: string, done: DoneCallback) => string;

const keyDispatch = (ch: string): KeyHandler => {
  if (ENTER_CHARS.has(ch)) return (buf: string, _ch: string, done: DoneCallback): string => { done(buf); return buf; };
  if (BACKSPACE_CHARS.has(ch)) return (buf: string): string => handleBackspace(buf);
  return (buf: string, c: string): string => appendChar(buf, c);
};

const handleKeyInput = (ch: string, buf: string, done: DoneCallback): string => {
  if (ch === "\x03") process.exit(ExitCode.Failure);
  return keyDispatch(ch)(buf, ch, done);
};

const readSecret = (prompt: string): Promise<string> =>
  new Promise<string>((resolve: (value: string) => void) => {
    process.stderr.write(prompt);
    let buf: string = "";
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const done: DoneCallback = (b: string): void => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stderr.write("\n");
      resolve(b.trim());
    };
    process.stdin.on("data", (ch: string) => { buf = handleKeyInput(ch, buf, done); });
  });

const runDryRun = (parsed: ParsedFlags, token: string): void => {
  const opts: RequestOpts = buildRequest(parsed.action, token);
  console.log(formatDryRun(parsed.action, token, opts));
};

const execute = async (parsed: ParsedFlags, token: string): Promise<void> => {
  const opts: RequestOpts = buildRequest(parsed.action, token);
  const { body: reqBody, ...init }: RequestOpts = opts;
  const res: Response = await fetch(API, { ...init, body: reqBody ?? null });
  const body: string = res.ok ? "" : await res.text();
  console.log(formatResult(parsed.action, { ok: res.ok, status: res.status, body }));
};

const abort = (msg: string): never => {
  console.error(msg);
  return process.exit(ExitCode.Failure);
};

const requireToken = async (): Promise<string> => {
  const token: string = await readSecret("Discord token: ");
  return token || abort("Token is required.");
};

const run = async (parsed: ParsedFlags, token: string): Promise<void> =>
  parsed.dryRun ? runDryRun(parsed, token) : execute(parsed, token);

const main = async (): Promise<void> => {
  const parsed: ParsedFlags = parseFlags(process.argv) ?? abort(usageMessage());
  const token: string = await requireToken();
  await run(parsed, token);
};

await main();
