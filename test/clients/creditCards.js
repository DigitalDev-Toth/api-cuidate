const sinon  = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');

const expect = chai.expect;
const executeQuery = sinon.spy();
const creditCards = proxyquire('../../src/clients/creditCards.js',  {
    '../core/db': {
        executeQuery: executeQuery
    }
});
describe('credit Card Client', function() {
    describe('get', function() {
        it('should execute query', (done) => {
            creditCards.get('dfsdfs')
            expect(executeQuery.calledOnce).to.be.true;
            done();
        });
    });
});