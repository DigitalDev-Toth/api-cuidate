const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.CUIDATEDBUSER,
  host: process.env.CUIDATEDBHOST,
  database: process.env.CUIDATEDBNAME,
  password: process.env.CUIDATEDBPASS,
  port: process.env.CUIDATEDBPORT
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then(client => {
        return client
          .query(query, params)
          .then(res => {
            client.release();
            resolve(res.rows);
          })
          .catch(e => {
            client.release();
            console.log("ERROR", e);
            reject(e.stack);
          });
      })
      .catch(e => {
        console.log("ERROR", e);
        reject(e.stack);
      });
  });
};

module.exports = { executeQuery };
