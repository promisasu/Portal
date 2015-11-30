'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.server.auth = false;

const server = require('../server')(config);

test.cb('invalid patient pin errors', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/patient/breaks'
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});
