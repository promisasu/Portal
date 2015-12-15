'use strict';

const test = require('ava');
const database = require('../../config.json').database;

database.name = 'prp_test';

require('../../model').setup(database);
const createSurvey = require('../task/create-survey');
const testValue = 1;

test('create can create a survey instance', () => {
    return createSurvey(testValue, testValue, testValue, testValue, 'day');
});
