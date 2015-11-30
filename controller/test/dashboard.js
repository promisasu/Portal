'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.server.auth = false;

const server = require('../server')(config);

test.cb('dashboard loads okay', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/'
        },
        (response) => {
            t.is(response.statusCode, 200);
            t.end();
        }
    );
});
