'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when trial has no patients', (t) => {
    const query = sinon.stub();

    query.returns(Promise.resolve([]));

    const trialCSV = proxyquire('../handler/trial-csv', {
        boom: sinon.stub(),
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        },
        path: '/trial/2-weekly.csv'
    };

    const reply = (data) => {
        t.is(
            data,
            'Patient Pin,Date Started,Week 0,Week 1,Week 2,Week 3,Week 4,Week 5\n',
            'it should return headers'
        );

        return {
            type (type) {
                t.is(type, 'text/csv', 'it should sent in csv format');
                t.end();
            }
        };
    };

    trialCSV(request, reply);
});

test.cb('when trial does not exist', (t) => {
    const query = sinon.stub();

    query.returns(Promise.reject([]));

    const trialCSV = proxyquire('../handler/trial-csv', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: Number.NaN
        },
        path: '/trial/2-weekly.csv'
    };

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have error object');
        t.end();
    };

    trialCSV(request, reply);
});
