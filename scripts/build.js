const { execSync } = require('child_process');
const dir = `dist/${pack.version}/${pack.name}`;
const pack = require('../package.json');
const command = `npm run prettier; node_modules/.bin/pkg -t latest-linux-x64 -o ./${dir} src/index.js; cp package.json ecosystem.config.js ${dir}/; echo DIRAPP=${dir}`;
execSync(command,{stdio: [process.stdin, process.stdout, process.stderr]});

