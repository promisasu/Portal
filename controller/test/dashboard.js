'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const httpNotFound = 404;
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when there are no trials, dashboard can still be viewed', (t) => {
    const query = sinon.stub();

    query.returns(Promise.resolve([]));

    const dashboard = proxyquire('../handler/dashboard', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
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

    dashboard(request, reply);
});

test.cb('when there is an error gracefully fail and display error page', (t) => {
    const query = sinon.stub();

    query.returns(Promise.reject());

    const dashboard = proxyquire('../handler/dashboard', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
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

    dashboard(request, reply);
});
