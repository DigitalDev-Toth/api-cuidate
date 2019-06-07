const crypto = require('crypto')
const creditCards = require('../clients/creditCards');

const parserData = (rows) => {
    const data = [];
    rows.forEach(row => {
        data.push({
            'id': crypto.createHash('md5').update(row.id).digest("hex"),
            'type': row.type,
            'last_numbers' : row.last_numbers,
            'payment_type': row.payment_type,
            'default': row.default_card,
            'exp_date': row.exp_date,
            'state': row.card_state
        })    
    });
    return data;
}

const get = async(req, res, next) => {
    if(!req.query.client) {
        return res.status(200).send({error: 6});
    }

    const client = req.query.client;
    try {
        const data = await creditCards.get(client);
        return res.status(200).send(parserData(data));
    }
    catch(e) {
        console.log("ERROR, obteniendo las tarjetas de credito", e)
        return res.status(500).send("ERROR OBTENIENDO LA DATA DEL CLIENTE")
    }
    
}

module.exports = { get }