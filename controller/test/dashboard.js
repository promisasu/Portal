'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';

const server = require('../server')(config);

test('dashboard loads okay', (t) => {
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
