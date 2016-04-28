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

    const patientCSV = proxyquire('../handler/trial-csv', {
        boom: sinon.stub(),
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        }
    };

    const reply = (data) => {
        t.is(
            data,
            'Trial Name,Patient Pin,Patient Date Started,Patient Date Completed'
            + ',Survey Name,Survey ID,Question ID,Question Prompt,Question'
            + ' Answer\n',
            'it should show the headers with no data'
        );

        return {
            type (type) {
                t.is(type, 'text/csv', 'it should sent in csv format');
                t.end();
            }
        };
    };

    patientCSV(request, reply);
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
