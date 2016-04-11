'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when patient has no surveys', (t) => {
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
        t.is(
            data,
            'patient pin,survey name,unique survey id,unique question id,question,question option\n',
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

test.cb('when patient doesn\'t exist', (t) => {
    const query = sinon.stub();

    query.returns(Promise.reject([]));

    const patientCSV = proxyquire('../handler/patient-csv', {
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
