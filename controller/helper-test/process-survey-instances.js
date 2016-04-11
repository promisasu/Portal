'use strict';

const test = require('ava');
const moment = require('moment');
const processSurveyInstances = require('../helper/process-survey-instances');

test('when survey is completed in one day with two days allowed', (t) => {
    const open = moment('2000-01-01');
    const close = moment('2000-01-03');
    const completed = moment('2000-01-02');

    const result = processSurveyInstances.calculateTimeLeft(open, close, completed);

    t.is(result, 50, 'it should have 50% of time remaining');
});

test('when survey is completed at end time', (t) => {
    const open = moment('2000-01-01');
    const close = moment('2000-01-02');
    const completed = moment('2000-01-02');

    const result = processSurveyInstances.calculateTimeLeft(open, close, completed);

    t.is(result, 0, 'it should have no time remaining');
});

test('when survey is completed after end time', (t) => {
    const open = moment('2000-01-01');
    const close = moment('2000-01-02');
    const completed = moment('2000-01-03');

    const result = processSurveyInstances.calculateTimeLeft(open, close, completed);

    t.is(result, 0, 'it should have no time remaining');
});

test('when chart data is generated', (t) => {
    const result = processSurveyInstances.pickTimeLeft([]);
    const expectedKeys = [
        'label',
        'backgroundColor',
        'borderColor',
        'pointBorderColor',
        'data'
    ];

    t.true(result instanceof Array, 'it should return an array');
    t.deepEqual(Object.keys(result[0]), expectedKeys, 'it should have keys needed for chart js');
});

test('when chart axes are generated with no dates', (t) => {
    const result = processSurveyInstances.pickDates([]);

    t.deepEqual(result, [], 'it should have no dates');
});

test('when chart axes are generated with one date', (t) => {
    const data = [
        {
            startTime: 'Sat Jan 01 2000 00:00:00 GMT-0700 (MST)',
            dateCompleted: 'Sat Jan 02 2000 00:00:00 GMT-0700 (MST)'
        }
    ];

    const result = processSurveyInstances.pickDates(data);

    t.is(result.length, 2, 'it should have two dates');
});

test('when chart axes are generated with two dates', (t) => {
    const data = [
        {
            startTime: 'Sat Jan 01 2000 00:00:00 GMT-0700 (MST)',
            dateCompleted: 'Sat Jan 02 2000 00:00:00 GMT-0700 (MST)'
        },
        {
            startTime: 'Sat Jan 01 2000 00:00:00 GMT-0700 (MST)',
            dateCompleted: 'Sat Jan 02 2000 00:00:00 GMT-0700 (MST)'
        }
    ];

    const result = processSurveyInstances.pickDates(data);

    t.is(result.length, 3, 'it should have three dates');
});

test('when it generates the full chart information', (t) => {
    const result = processSurveyInstances([]);

    const expectedKeys = [
        'labels',
        'datasets'
    ];

    t.deepEqual(Object.keys(result), expectedKeys, 'it should have the keys needed by chart js');
});
