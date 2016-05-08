'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when patients exist in trial', (t) => {
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
        },
        query: {
            fromDate: new Date(),
            toDate: new Date()
        }
    };

    const reply = {
        view (template, data) {
            t.is(template, 'trial', 'it should render the trial view');
            t.is(data.patients.length, 0, 'it should have no patients');
            t.is(data.complianceCount[0], 0, 'it should have no non-compliant patients');
            t.is(data.complianceCount[1], 0, 'it should have no semi-compliant patients');
            t.is(data.complianceCount[2], 0, 'it should have no compliant patients');
            t.end();
        }
    };

    trial(request, reply);
});

test.cb('when trial does not exist', (t) => {
    const query = sinon.stub();

    query.returns(Promise.reject([]));

    const patientCSV = proxyquire('../handler/trial-csv', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: Number.NaN
        }
    };

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have error object');
        t.end();
    };

    patientCSV(request, reply);
});
