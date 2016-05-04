'use strict';

const test = require('ava');
const processLoggerResults = require('../helper/process-logger-results');

test('when a value is given', (t) => {
    const value = {
        eventName: 'example',
        metaData: {
            key: 'value'
        },
        startTime: '2000-01-01 00:00'
    };
    const expected = {
        eventName: 'example',
        metaData: '{"key":"value"}',
        start: '2000-01-01 00:00'
    };

    t.deepEqual(processLoggerResults(value), expected, 'it should process correctly');
});

test('when a extraneous keys are given', (t) => {
    const value = {
        doesNotBelong: 'value',
        eventName: 'example',
        metaData: {
            key: 'value'
        },
        startTime: '2000-01-01 00:00',
        alsoDoesNotBelong: 'value'
    };
    const expected = {
        eventName: 'example',
        metaData: '{"key":"value"}',
        start: '2000-01-01 00:00'
    };

    t.deepEqual(processLoggerResults(value), expected, 'it should eliminate the unused keys');
});
