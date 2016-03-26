'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const httpNotFound = 404;
const QueryTypes = {
    SELECT: 'select'
};

test.cb('dashboard can be viewed with no trials', (t) => {
    const query = sinon.stub();

    query.returns(Promise.resolve([]));

    const dashboard = proxyquire('../handler/dashboard', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const fakeRequest = {
        auth: {
            credentials: 'dne'
        },
        log: sinon.stub()
    };

    const reply = {
        view: (template, data) => {
            t.is(template, 'dashboard');
            t.is(typeof data, 'object');
            t.true(data.trials instanceof Array);
            t.end();
        }
    };

    dashboard(fakeRequest, reply);
});

test.cb('dashboard gracefully handles errors', (t) => {
    const query = sinon.stub();

    query.returns(Promise.reject());

    const dashboard = proxyquire('../handler/dashboard', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const fakeRequest = {
        auth: {
            credentials: 'dne'
        },
        log: sinon.stub()
    };

    const reply = {
        view: (template, data) => {
            t.is(template, '404');
            t.is(typeof data, 'object');

            return {
                code: (code) => {
                    t.is(code, httpNotFound);
                    t.end();
                }
            };
        }
    };

    dashboard(fakeRequest, reply);
});
