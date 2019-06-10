const sinon  = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');

const expect = chai.expect;
const listener = sinon.spy();
const controller = sinon.spy();

const app = {
    get: controller,
    listen: listener
}
const index = proxyquire('../../src/index.js',  {
    'express': () => {
        return app;
    },
    './controllers/creditCards': () => {
        return {get : controller}
    }    
})
describe('index', function() {
    describe('start', function() {
        it('should start a server in port 3000', function(done) {
            expect(controller.calledOnce).to.be.true        
            expect(listener.calledOnce).to.be.true
            done();
        });
    });
});