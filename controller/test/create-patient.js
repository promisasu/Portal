'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.dashboard.authentication = false;

const server = require('../server')(config);
const httpBadRequest = 400;

test.cb('invalid patient cannot be added', (t) => {
    server.inject(
        {
            method: 'POST',
            url: '/patient'
        },
        (response) => {
            t.is(response.statusCode, httpBadRequest);
            t.end();
        }
    );
});
