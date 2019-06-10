const pack = require('./package.json');
const name = pack.name + '-' + pack.version;
module.exports = {
    apps : [{
      name        : name,
      script      : 'dist/' + name,
      interpreter : 'none',
      watch       : true,
      env: {
        'NODE_ENV': 'development',
        CUIDATEDBUSER: process.env.CUIDATEDBUSER, 
        CUIDATEDBHOST: process.env.CUIDATEDBHOST,
        CUIDATEDBNAME: process.env.CUIDATEDBNAME,
        CUIDATEDBPASS: process.env.CUIDATEDBPASS,
        CUIDATEDBPORT: process.env.CUIDATEDBPORT
      },
      env_production : {
        'NODE_ENV': 'production',
        CUIDATEDBUSER: process.env.CUIDATEDBUSER, 
        CUIDATEDBHOST: process.env.CUIDATEDBHOST,
        CUIDATEDBNAME: process.env.CUIDATEDBNAME,
        CUIDATEDBPASS: process.env.CUIDATEDBPASS,
        CUIDATEDBPORT: process.env.CUIDATEDBPORT
      }
    }]
  }