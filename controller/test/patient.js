'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';

const server = require('../server')(config);

test('invalid patient pin errors', (t) => {
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
