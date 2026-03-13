import test from "node:test";
import assert from "node:assert/strict";

import {
  HOMEBREW_INSTALL_URL,
  commandExists,
  ensureHomebrew,
  ensureNodeAvailable,
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

test("prependPathEntries uses the platform path delimiter from the current runtime", () => {
  const originalPath = process.platform === "win32" ? "C:\\Windows;C:\\Tools" : "/usr/bin:/bin";
  const expectedPath = process.platform === "win32"
    ? "/opt/homebrew/bin;C:\\Windows;C:\\Tools"
    : "/opt/homebrew/bin:/usr/bin:/bin";

  assert.deepEqual(prependPathEntries({ PATH: originalPath }, ["/opt/homebrew/bin"]), {
    PATH: expectedPath,
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
      command: "node",
      env: { PATH: "/usr/bin" },
      platform: "darwin",
      runner,
    }),
    true
  );

  assert.equal(calls[0].command, "which");
  assert.deepEqual(calls[0].args, ["node"]);
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
      command: "node",
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
    command: "node",
    args: ["./hypesquad.js"],
    env: { PATH: "/usr/bin" },
    exec,
  });

  assert.deepEqual(calls, [
    {
      command: "node",
      args: ["./hypesquad.js"],
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

test("ensureNodeAvailable returns immediately when node already exists", () => {
  const calls = [];
  const env = ensureNodeAvailable({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists: ({ command }) => {
      calls.push(command);
      return command === "node";
    },
    run: () => {
      throw new Error("should not install node");
    },
    log: () => {
      throw new Error("should not log");
    },
  });

  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  assert.deepEqual(calls, ["node"]);
});

test("ensureNodeAvailable installs Node.js through Homebrew when node is missing", () => {
  const events = [];
  const logs = [];
  let nodeChecks = 0;

  const exists = ({ command }) => {
    events.push(`exists:${command}`);
    if (command === "node") {
      nodeChecks += 1;
      return nodeChecks > 1;
    }

    return true;
  };

  const run = ({ command, args, env }) => {
    events.push(`run:${command}:${args.join(" ")}`);
    assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  };

  const env = ensureNodeAvailable({
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    exists,
    run,
    log: (message) => logs.push(message),
  });

  assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
  assert.deepEqual(logs, ["`node` not found. Installing Node.js..."]);
  assert.deepEqual(events, [
    "exists:node",
    "exists:brew",
    "run:brew:install node",
    "exists:node",
  ]);
});

test("ensureNodeAvailable throws when node is still missing after installation", () => {
  let commandChecks = 0;

  assert.throws(
    () =>
      ensureNodeAvailable({
        env: { PATH: "/usr/bin" },
        platform: "darwin",
        exists: ({ command }) => {
          commandChecks += 1;
          return command === "brew";
        },
        run: () => {},
        log: () => {},
      }),
    /node` is still unavailable/
  );

  assert.equal(commandChecks, 3);
});

test("launchCli ensures node availability before running the bundled script", () => {
  const calls = [];
  let nodeChecks = 0;
  launchCli({
    argv: ["--bravery", "--dry-run"],
    script: "/repo/hypesquad.js",
    env: { PATH: "/usr/bin" },
    platform: "darwin",
    node: "node",
    exists: ({ command }) => {
      if (command === "node") {
        nodeChecks += 1;
        return nodeChecks > 1;
      }

      return true;
    },
    run: ({ command, args, env }) => {
      assert.equal(env.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin");
      calls.push(`run:${command}:${args.join(" ")}`);
    },
    log: () => {},
  });

  assert.deepEqual(calls, [
    "run:brew:install node",
    "run:node:/repo/hypesquad.js --bravery --dry-run",
  ]);
});

test("launchCli reuses the current node executable without requiring PATH lookup", () => {
  const calls = [];

  launchCli({
    argv: ["--bravery"],
    script: "/repo/hypesquad.js",
    env: { PATH: "/usr/bin" },
    node: "/custom/node",
    exists: () => {
      throw new Error("should not check PATH when a node executable is provided");
    },
    run: ({ command, args, env }) => {
      assert.deepEqual(env, { PATH: "/usr/bin" });
      calls.push(`run:${command}:${args.join(" ")}`);
    },
    log: () => {},
  });

  assert.deepEqual(calls, [
    "run:/custom/node:/repo/hypesquad.js --bravery",
  ]);
});
