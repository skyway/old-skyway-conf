const path = require('path');
const { spawn } = require('child_process');

const flags = process.argv.slice(2);
const config = require('./postcss.config.js');

// Parse postcss.config.js's extra fileds like webpack.config.js
const entries = [];
for (const [name, src] of Object.entries(config.entry)) {
  const input = path.join(config.context, src);
  const output = path.join(config.output.path, config.output.filename).replace('[name]', name);

  entries.push({ name, input, output });
}

// Convert config into commands to exec
const cmds = [];
for (const entry of entries) {
  const cmd = {
    cmd: './node_modules/.bin/postcss',
    args: [
      entry.input,
      '-o',
      entry.output,
    ]
  };

  if (flags.includes('-w') || flags.includes('--watch')) {
    cmd.args.push('-w');
  }

  cmds.push(cmd);
}

// Spawn commands
for (const { cmd, args } of cmds) {
  const proc = spawn(cmd, args);

  // don't know why but all message goes stderr
  proc.stderr.on('data', data => {
    console.log(data.toString());
  });
}
