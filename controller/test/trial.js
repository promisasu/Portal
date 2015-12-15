'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.server.auth = false;

const server = require('../server')(config);
const httpFoundRedirect = 302;
const httpBadRequest = 400;

test.cb('redirect when trial does not exist', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/trial/10000'
        },
        (response) => {
            t.is(response.statusCode, httpFoundRedirect);
            t.end();
        }
    );
});

test.cb('invalid trial id errors', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/trial/breaks'
        },
        (response) => {
            t.is(response.statusCode, httpBadRequest);
            t.end();
        }
    );
});
