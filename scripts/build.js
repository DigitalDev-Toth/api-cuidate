const { execSync } = require('child_process');

const pack = require('../package.json');
const name = pack.name + '-' + pack.version;
const command = `npm run prettier; node_modules/.bin/pkg -t latest-linux-x64 -o ./dist/${name} src/index.js`;
execSync(command,{stdio: [process.stdin, process.stdout, process.stderr]});

