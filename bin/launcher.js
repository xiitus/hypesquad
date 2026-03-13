import { execFileSync } from "child_process";

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

export const launchCli = ({
  argv,
  script,
  env = process.env,
  node = process.execPath,
  run = runOrThrow,
}) => {
  run({
    command: node,
    args: [script, ...argv],
    env,
  });
};
