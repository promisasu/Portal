'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when there are no trials', (t) => {
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
        view (template, data) {
            t.is(template, 'dashboard', 'it should render dashboard');
            t.is(data.trials.length, 0, 'it should have no trials');
            t.end();
        }
    };

    dashboard(request, reply);
});

test.cb('when there is an error', (t) => {
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
        view (template, data) {
            t.is(template, '404', 'it should render the not found page');
            t.is(data.title, 'Not Found', 'it should have \'Not Found\' as the title');

            return {
                code (code) {
                    t.is(code, 404, 'it should return not found status code');
                    t.end();
                }
            };
        }
    };

    dashboard(request, reply);
});
