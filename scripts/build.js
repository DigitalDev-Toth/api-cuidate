const { execSync } = require('child_process');
const pack = require('../package.json');

const dir = `dist/${pack.name}`;
const command = `npm run prettier; node_modules/.bin/pkg -t latest-linux-x64 -o ./${dir} src/index.js; cp package.json ecosystem.config.js dist/;`;
execSync(command,{stdio: [process.stdin, process.stdout, process.stderr]});

