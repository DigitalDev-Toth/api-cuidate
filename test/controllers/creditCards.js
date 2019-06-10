const sinon  = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');

const expect = chai.expect;
let statusResponse = 200
const send = sinon.spy();
let rows = [
    {
        id: 'XXXXXX',
        type: 'type',
        last_numbers: '1234',
        payment_type: 'type',
        default_card: 'CC',
        exp_date: 'exp_date',
        card_state:'card_state'
    },
    {
        id: 'XXXXXX',
        type: 'type',
        last_numbers: '1234',
        payment_type: 'type',
        default_card: 'CC',
        exp_date: 'exp_date',
        card_state:'card_state'
    }
]

let rowsResult = [
    {
        id: 'XXXXXX',
        type: 'type',
        last_numbers: '1234',
        payment_type: 'type',
        default: 'CC',
        exp_date: 'exp_date',
        state:'card_state'
    },
    {
        id: 'XXXXXX',
        type: 'type',
        last_numbers: '1234',
        payment_type: 'type',
        default: 'CC',
        exp_date: 'exp_date',
        state:'card_state'
    }
]
let getClient =  {get: () => Promise.resolve(rows)}
const creditCards = proxyquire('../../src/controllers/creditCards.js',  {
    'crypto': {
        createHash: () => {
            return {
                update: ()=> {
                    return {
                        digest: e => "XXXXXX"
                    }
                }
            }
        }
    },
    '../clients/creditCards': getClient
});
const req = {
    query: {
        client: "id"
    }
}
const res =  {
    status: (status) => {
        statusResponse = status;
        return {
            send: send
        }
    }
}
describe('credit Card Controller', function() {
    describe('get', function() {
        it('should respont status 200 and the json correspond when client not exist', async() => {
            req.query.client = null;
            await creditCards.get(req, res)
            expect(statusResponse).to.be.eql(200);
            expect(send.calledWithExactly({ error: 6 })).to.be.true;
        });
        it('should respont status 200 and the json correspond when client exist', async() => {
            send.resetHistory()
            req.query.client = 'client';
            await creditCards.get(req, res)
            expect(statusResponse).to.be.eql(200);
            expect(send.calledWithExactly(rowsResult)).to.be.true;
        });
        it('should respont status 500 and the json correspond when client exist but error in db occur', async() => {
            send.resetHistory()
            req.query.client = 'client';
            getClient.get = () => Promise.reject('error')
            await creditCards.get(req, res)

            expect(statusResponse).to.be.eql(500);
            expect(send.calledWithExactly('ERROR OBTENIENDO LA DATA DEL CLIENTE')).to.be.true;
                    
        });
    });
});