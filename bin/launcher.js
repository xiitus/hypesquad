import { execFileSync, spawnSync } from "child_process";
import { delimiter } from "path";

export const HOMEBREW_INSTALL_URL =
  "https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh";

const DEFAULT_BREW_BIN_PATHS = ["/opt/homebrew/bin", "/usr/local/bin"];

const hasStatus = (result) => result && typeof result.status === "number";

export const prependPathEntries = (env, entries) => {
  const currentPath = env.PATH ?? "";
  const currentEntries = currentPath.split(delimiter).filter(Boolean);
  const additions = entries.filter((entry) => !currentEntries.includes(entry));

  if (additions.length === 0) {
    return env;
  }

  return {
    ...env,
    PATH: [...additions, ...currentEntries].join(delimiter),
  };
};

export const commandExists = ({
  command,
  env,
  platform,
  runner = spawnSync,
}) => {
  const lookupCommand = platform === "win32" ? "where" : "which";
  const result = runner(lookupCommand, [command], {
    env,
    stdio: "ignore",
  });

  return hasStatus(result) ? result.status === 0 : false;
};

export const runOrThrow = ({
  command,
  args,
  env,
  exec = execFileSync,
}) => {
  exec(command, args, {
    env,
    stdio: "inherit",
  });
};

export const ensureHomebrew = ({
  env,
  platform,
  log = console.error,
  exists = commandExists,
  run = runOrThrow,
}) => {
  let nextEnv = prependPathEntries(env, DEFAULT_BREW_BIN_PATHS);

  if (exists({ command: "brew", env: nextEnv, platform })) {
    return nextEnv;
  }

  if (platform !== "darwin") {
    throw new Error(
      "Homebrew is unavailable and automatic installation is only supported on macOS."
    );
  }

  log("Homebrew not found. Installing Homebrew...");
  run({
    command: "/bin/bash",
    args: ["-c", `$(curl -fsSL ${HOMEBREW_INSTALL_URL})`],
    env: nextEnv,
  });

  nextEnv = prependPathEntries(nextEnv, DEFAULT_BREW_BIN_PATHS);

  if (!exists({ command: "brew", env: nextEnv, platform })) {
    throw new Error("Homebrew installation completed, but `brew` is still unavailable.");
  }

  return nextEnv;
};

export const ensureNodeAvailable = ({
  env,
  platform,
  log = console.error,
  exists = commandExists,
  run = runOrThrow,
}) => {
  let nextEnv = prependPathEntries(env, DEFAULT_BREW_BIN_PATHS);

  if (exists({ command: "node", env: nextEnv, platform })) {
    return nextEnv;
  }

  log("`node` not found. Installing Node.js...");
  nextEnv = ensureHomebrew({
    env: nextEnv,
    platform,
    log,
    exists,
    run,
  });

  run({
    command: "brew",
    args: ["install", "node"],
    env: nextEnv,
  });

  nextEnv = prependPathEntries(nextEnv, DEFAULT_BREW_BIN_PATHS);

  if (!exists({ command: "node", env: nextEnv, platform })) {
    throw new Error("Node.js installation completed, but `node` is still unavailable.");
  }

  return nextEnv;
};

export const launchCli = ({
  argv,
  script,
  platform = process.platform,
  env = process.env,
  node = process.execPath,
  log = console.error,
  exists = commandExists,
  run = runOrThrow,
}) => {
  const nextEnv = node === "node" ? ensureNodeAvailable({
    env,
    platform,
    log,
    exists,
    run,
  }) : env;

  run({
    command: node,
    args: [script, ...argv],
    env: nextEnv,
  });
};
