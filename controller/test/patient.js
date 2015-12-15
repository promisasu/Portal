'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.server.auth = false;

const server = require('../server')(config);
const httpBadRequest = 400;

test.cb('invalid patient pin errors', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/patient/breaks'
        },
        (response) => {
            t.is(response.statusCode, httpBadRequest);
            t.end();
        }
    );
});
