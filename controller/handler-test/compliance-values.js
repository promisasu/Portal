'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when patients exist in trial', (t) => {
    const query = sinon.stub();

    query.returns(Promise.resolve([]));
    const complianceValues = proxyquire('../handler/compliance-values');
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
        view (complianceCount) {
            t.is(complianceCount[0], 0, 'it should have no non-compliant patients');
            t.is(complianceCount[1], 0, 'it should have no semi-compliant patients');
            t.is(complianceCount[2], 0, 'it should have no compliant patients');
            t.end();
        }
    };

    complianceValues(request, reply);
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
