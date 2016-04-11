'use strict';

const test = require('ava');
const processComplianceCount = require('../helper/process-compliance-count');

test('when patient has no expired surveys', (t) => {
    const data = [
        {
            expiredCount: 0
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [0, 0, 1];

    t.deepEqual(result, expectedResult, 'it should show patient is compliant');
});

test('when patient\'s have one or two expired surveys', (t) => {
    const data = [
        {
            expiredCount: 1
        },
        {
            expiredCount: 2
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [0, 2, 0];

    t.deepEqual(result, expectedResult, 'it should show patients are semi-compliant');
});

test('when a patient has three or more expired surveys', (t) => {
    const data = [
        {
            expiredCount: 3
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [1, 0, 0];

    t.deepEqual(result, expectedResult, 'it should show patient is non-compliant');
});

test('when there are multiple patients with different compliance', (t) => {
    const data = [
        {
            expiredCount: 0
        },
        {
            expiredCount: 1
        },
        {
            expiredCount: 3
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [1, 1, 1];

    t.deepEqual(result, expectedResult, 'it should show correct overall compliance counts');
});
