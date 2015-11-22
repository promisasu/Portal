'use strict';

const test = require('ava');
const database = require('../../config.json').database;

database.name = 'prp_test';

require('../../model').setup(database);
const createSurvey = require('../task/create-survey');

test('create can create a survey instance', (t) => {
    createSurvey(1, 1, 1, 1, 'day')
    .then(() => {
        t.pass();
        t.end();
    })
    .catch((err) => {
        console.error(err);
        t.fail();
        t.end();
    });
});
