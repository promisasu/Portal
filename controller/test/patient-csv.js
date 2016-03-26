'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when patient has not data show table headers', (t) => {
    const query = sinon.stub();

    query.returns(Promise.resolve([]));

    const patientCSV = proxyquire('../handler/patient-csv', {
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
        t.is(data, 'patient pin,survey name,unique survey id,unique question id,question,question option\n');

        return {
            type: (type) => {
                t.is(type, 'text/csv');
                t.end();
            }
        };
    };

    patientCSV(request, reply);
});

test.cb('when patient doesn\'t exist return not found', (t) => {
    const query = sinon.stub();
    const boom = sinon.stub();

    query.returns(Promise.reject([]));
    boom.returns({name: 'Error'});

    const patientCSV = proxyquire('../handler/patient-csv', {
        boom,
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
        t.is(typeof data, 'object');
        t.is(data.name, 'Error');
        t.end();
    };

    patientCSV(request, reply);
});
