'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';

const server = require('../../server')(config);

test('redirect when trial does not exist', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/trial/10000'
        },
        (response) => {
            t.is(response.statusCode, 302);
            t.end();
        }
    );
});

test('invalid trial id errors', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/trial/breaks'
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});
