'use strict';

const test = require('ava');
const moment = require('moment');
const config = require('../../config.json');

config.database.name = 'prp_test';

const server = require('../server')(config);

test('trial name must have at least 3 letters', (t) => {
    server.inject(
        {
            method: 'POST',
            url: '/trial',
            payload: {
                name: 'no',
                description: 'a test description',
                IRBID: 't3st',
                IRBStart: moment(),
                IRBEnd: moment(),
                targetCount: 1
            }
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});

test('IRB id must have at least 4 letters', (t) => {
    server.inject(
        {
            method: 'POST',
            url: '/trial',
            payload: {
                name: 'test',
                description: 'a test description',
                IRBID: 'not',
                IRBStart: moment(),
                IRBEnd: moment(),
                targetCount: 1
            }
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});

test('IRB start date must be future', (t) => {
    server.inject(
        {
            method: 'POST',
            url: '/trial',
            payload: {
                name: 'test',
                description: 'a test description',
                IRBID: 'test',
                IRBStart: moment().subtract(1, 'day'),
                IRBEnd: moment(),
                targetCount: 1
            }
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});

test('IRB end date must be future', (t) => {
    server.inject(
        {
            method: 'POST',
            url: '/trial',
            payload: {
                name: 'test',
                description: 'a test description',
                IRBID: 'test',
                IRBStart: moment(),
                IRBEnd: moment().subtract(1, 'day'),
                targetCount: 1
            }
        },
        (response) => {
            t.is(response.statusCode, 400);
            t.end();
        }
    );
});
