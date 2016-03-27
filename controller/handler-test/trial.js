'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const zero = 0;
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when there are no patients', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('trial')
    .returns({
        findById () {
            return Promise.resolve({
                name: 'example',
                description: 'example',
                IRBID: 1,
                IRBStart: new Date(),
                IRBEnd: new Date(),
                targetCount: 1,
                patientPinCounter: 1
            });
        }
    });

    model
    .withArgs('stage')
    .returns({
        findAll () {
            return Promise.resolve([]);
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([]));

    query
    .onSecondCall()
    .returns(Promise.resolve([]));

    query
    .onThirdCall()
    .returns(Promise.resolve([]));

    const trial = proxyquire('../handler/trial', {
        '../../model': {
            sequelize: {model, query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            id: 1
        }
    };

    const reply = {
        view (template, data) {
            t.is(template, 'trial', 'it should render the trial view');
            t.is(data.patients.length, zero, 'it should have no patients');
            t.is(data.complianceCount[0], zero, 'it should have no non-compliant patients');
            t.is(data.complianceCount[1], zero, 'it should have no semi-compliant patients');
            t.is(data.complianceCount[2], zero, 'it should have no compliant patients');
            t.end();
        }
    };

    trial(request, reply);
});

test.todo('when there is one patient');

test.todo('when trial does not exist')
