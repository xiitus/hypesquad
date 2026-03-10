import test from "node:test";
import assert from "node:assert/strict";

import {
  HOMEBREW_INSTALL_URL,
  commandExists,
  ensureHomebrew,
  ensureNpxAvailable,
  launchCli,
  prependPathEntries,
  runOrThrow,
} from "../bin/launcher.js";

test("prependPathEntries adds only missing path entries", () => {
  const env = { PATH: "/usr/bin:/bin" };

  assert.deepEqual(prependPathEntries(env, ["/opt/homebrew/bin"]), {
    PATH: "/opt/homebrew/bin:/usr/bin:/bin",
  });
  assert.equal(prependPathEntries(env, ["/usr/bin"]).PATH, "/usr/bin:/bin");
  assert.deepEqual(prependPathEntries({}, ["/opt/homebrew/bin"]), {
    PATH: "/opt/homebrew/bin",
  });
});

test("commandExists uses which on unix and where on win32", () => {
  const calls = [];
  const runner = (command, args, options) => {
    calls.push({ command, args, options });
    return { status: 0 };
  };

  assert.equal(
    commandExists({
      command: "npx",
      env: { PATH: "/usr/bin" },
      platform: "darwin",
      runner,
    }),
    true
  );

  assert.equal(calls[0].command, "which");
  assert.deepEqual(calls[0].args, ["npx"]);
  assert.deepEqual(calls[0].options, {
    env: { PATH: "/usr/bin" },
    stdio: "ignore",
  });

  assert.equal(
    commandExists({
      command: "brew",
      env: { PATH: "C:\\Windows" },
      platform: "win32",
      runner,
    }),
    true
  );
  assert.equal(calls[1].command, "where");
});

test("commandExists returns false when the runner does not provide a numeric status", () => {
  const runner = () => ({});

  assert.equal(
    commandExists({
      command: "npx",
      env: { PATH: "/usr/bin" },
      platform: "linux",
      runner,
    }),
    false
  );
});

test("runOrThrow executes commands with inherited stdio", () => {
  const calls = [];
  const exec = (command, args, options) => {
    calls.push({ command, args, options });
  };

  runOrThrow({
    command: "npx",
    args: ["--yes", "tsx"],
    env: { PATH: "/usr/bin" },
    exec,
  });

  assert.deepEqual(calls, [
    {
      command: "npx",
      args: ["--yes", "tsx"],
      options: {
        env: { PATH: "/usr/bin" },
        stdio: "inherit",
      },
    },
  ]);
});

test("ensureHomebrew returns immediately when brew already exists", () => {
  const calls = [];
  const exists = ({ command }) => {
    calls.push(command);
    return true;
  };

  const env = ensureHomebrew({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists,
    run: () => {
      throw new Error("should not run installer");
    },
    log: () => {
      throw new Error("should not log");
    },
  });

  assert.deepEqual(calls, ["brew"]);
  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
});

test("ensureHomebrew throws on non-macOS when brew is missing", () => {
  assert.throws(
    () =>
      ensureHomebrew({
        env: { PATH: "/usr/bin" },
        platform: "linux",
        exists: () => false,
        run: () => {},
        log: () => {},
      }),
    /automatic installation is only supported on macOS/
  );
});

test("ensureHomebrew installs Homebrew and rechecks brew", () => {
  const events = [];
  const exists = ({ command }) => {
    events.push(`exists:${command}`);
    return events.length > 1;
  };
  const run = ({ command, args, env }) => {
    events.push(`run:${command}:${args.join(" ")}`);
    assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  };
  const logs = [];

  const env = ensureHomebrew({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists,
    run,
    log: (message) => logs.push(message),
  });

  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  assert.deepEqual(logs, ["Homebrew not found. Installing Homebrew..."]);
  assert.deepEqual(events, [
    "exists:brew",
    `run:/bin/bash:-c $(curl -fsSL ${HOMEBREW_INSTALL_URL})`,
    "exists:brew",
  ]);
});

test("ensureHomebrew throws when brew is still missing after installation", () => {
  assert.throws(
    () =>
      ensureHomebrew({
        env: { PATH: "/usr/bin" },
        platform: "darwin",
        exists: () => false,
        run: () => {},
        log: () => {},
      }),
    /brew` is still unavailable/
  );
});

test("ensureNpxAvailable returns immediately when npx already exists", () => {
  const calls = [];
  const env = ensureNpxAvailable({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists: ({ command }) => {
      calls.push(command);
      return command === "npx";
    },
    run: () => {
      throw new Error("should not install node");
    },
    log: () => {
      throw new Error("should not log");
    },
  });

  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  assert.deepEqual(calls, ["npx"]);
});

test("ensureNpxAvailable installs Node.js through Homebrew when npx is missing", () => {
  const events = [];
  const logs = [];
  let npxChecks = 0;

  const exists = ({ command }) => {
    events.push(`exists:${command}`);
    if (command === "npx") {
      npxChecks += 1;
      return npxChecks > 1;
    }

    return true;
  };

  const run = ({ command, args, env }) => {
    events.push(`run:${command}:${args.join(" ")}`);
    assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  };

  const env = ensureNpxAvailable({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists,
    run,
    log: (message) => logs.push(message),
  });

  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  assert.deepEqual(logs, ["`npx` not found. Installing Node.js..."]);
  assert.deepEqual(events, [
    "exists:npx",
    "exists:brew",
    "run:brew:install node",
    "exists:npx",
  ]);
});

test("ensureNpxAvailable throws when npx is still missing after node installation", () => {
  let commandChecks = 0;

  assert.throws(
    () =>
      ensureNpxAvailable({
        env: { PATH: "/usr/bin" },
        platform: "darwin",
        exists: ({ command }) => {
          commandChecks += 1;
          return command === "brew";
        },
        run: () => {},
        log: () => {},
      }),
    /npx` is still unavailable/
  );

  assert.equal(commandChecks, 3);
});

test("launchCli ensures npx availability and runs tsx through npx --yes", () => {
  const calls = [];
  let npxChecks = 0;

  launchCli({
    argv: ["--bravery", "--dry-run"],
    script: "/repo/hypesquad.ts",
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists: ({ command }) => {
      calls.push(`exists:${command}`);
      if (command === "npx") {
        npxChecks += 1;
        return npxChecks > 1;
      }

      return true;
    },
    run: ({ command, args }) => {
      calls.push(`run:${command}:${args.join(" ")}`);
    },
    log: () => {},
  });

  assert.deepEqual(calls, [
    "exists:npx",
    "exists:brew",
    "run:brew:install node",
    "exists:npx",
    "run:npx:--yes tsx /repo/hypesquad.ts --bravery --dry-run",
  ]);
});
