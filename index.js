#!/usr/bin/env node
"use strict";
const meow = require("meow");
const foo = require(".");
const shell = require("shelljs");

const cli = meow(
  `
    Usage
      $ sdkv --name butts

Pass any key and value and sd will be called to replace those keys and values in all the files in the project. Be careful running this on live projects!

    Examples
      $ sdkv --name unicorns
      🌈  Replaces all butts tags with unicorns
`,
  {
    flags: {}
  }
);

Object.keys(cli.flags).forEach(k => {
  const flag = cli.flags[k];

  const replacement = `'\\{\\{${k}\\}\\}' '${flag}'`;
  const cmd = `sd -i ${replacement} $(fd -t f)`;
  if (shell.exec(cmd).code !== 0) {
    shell.echo("replacement failed");
    shell.exit(1);
  } else {
    shell.echo("replaced all the things");
  }
});
