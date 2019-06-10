const { executeQuery } = require("../core/db");

const get = client => {
  const sql = `SELECT c.*, pf.name as payment_type, cs.name as card_state 
        FROM card c LEFT JOIN payment_from pf ON c.payment_from=pf.id 
        LEFT JOIN card_state cs ON c.state=cs.id 
        WHERE c.client=(SELECT id FROM client WHERE short_name=$1) ORDER by c.id`;
  return executeQuery(sql, [client]);
};

module.exports = { get };
