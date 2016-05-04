'use strict';

const test = require('ava');
const moment = require('moment');
const processSurveys = require('../helper/process-surveys');

test('when current time is between start and end', (t) => {
    const value = {
        name: 'example',
        id: 1,
        startTime: moment('2000-01-01'),
        endTime: moment('2000-01-03')
    };
    const now = moment('2000-01-02');
    const expected = {
        surveyTitle: 'example',
        surveyInstanceID: 1,
        nextDueAt: moment('2000-01-01'),
        okayToStart: true
    };

    t.deepEqual(processSurveys(value, now), expected, 'it should be okay to start');
});

test('when current time is before start', (t) => {
    const value = {
        name: 'example',
        id: 1,
        startTime: moment('2000-01-02'),
        endTime: moment('2000-01-03')
    };
    const now = moment('2000-01-01');
    const expected = {
        surveyTitle: 'example',
        surveyInstanceID: 1,
        nextDueAt: moment('2000-01-02'),
        okayToStart: false
    };

    t.deepEqual(processSurveys(value, now), expected, 'it should not be okay to start');
});

test('when current time is after end', (t) => {
    const value = {
        name: 'example',
        id: 1,
        startTime: moment('2000-01-01'),
        endTime: moment('2000-01-02')
    };
    const now = moment('2000-01-03');
    const expected = {
        surveyTitle: 'example',
        surveyInstanceID: 1,
        nextDueAt: moment('2000-01-01'),
        okayToStart: false
    };

    t.deepEqual(processSurveys(value, now), expected, 'it should not be okay to start');
});
