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

test.cb('when patient does not exist', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return null;
        }
    });

    transaction.returns(Promise.resolve({
        rollback () {
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

test.cb('when there is a conflict', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return Promise.reject();
        }
    });

    transaction.returns(Promise.resolve({
        rollback () {
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

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have error object');
        t.end();
    };

    deactivatePatient(request, reply);
});
