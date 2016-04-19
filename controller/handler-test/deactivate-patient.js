'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test.cb('when patient exists', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return {
                destroy () {
                    return;
                }
            };
        }
    });

    transaction.returns(Promise.resolve({
        commit () {
            return Promise.resolve();
        }
    }));

    const deactivatePatient = proxyquire('../handler/deactivate-patient', {
        '../../model': {
            sequelize: {
                model,
                transaction
            }
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        }
    };

    const reply = () => {
        t.pass('it should resolve');
        t.end();
    };

    deactivatePatient(request, reply);
});
