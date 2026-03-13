import test from "node:test";
import assert from "node:assert/strict";

import {
  launchCli,
  runOrThrow,
} from "../bin/launcher.js";

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

test("launchCli runs the bundled script with the current node executable", () => {
  const calls = [];
  launchCli({
    argv: ["--bravery", "--dry-run"],
    script: "/repo/hypesquad.js",
    env: { PATH: "/usr/bin" },
    node: "/usr/local/bin/node",
    run: ({ command, args, env }) => {
      assert.deepEqual(env, { PATH: "/usr/bin" });
      calls.push(`run:${command}:${args.join(" ")}`);
    },
  });

  assert.deepEqual(calls, [
    "run:/usr/local/bin/node:/repo/hypesquad.js --bravery --dry-run",
  ]);
});
