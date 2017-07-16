'use strict';

const test = require('ava');
const processComplianceCount = require('../helper/process-compliance-count');

test('when patient has no expired surveys', (t) => {
    const data = [
        {
            completedWeeklyCount: 3,
            expiredWeeklyCount: 2,
            completedDailyCount: 25,
            expiredDailyCount: 10
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [0, 0, 1];

    t.deepEqual(result, expectedResult, 'it should show patient is compliant');
});

/* test('when patient\'s have one or two expired surveys', (t) => {
    const data = [
        {
            expiredCount: 1
        },
        {
            expiredCount: 2
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [0, 0, 2];

    t.deepEqual(result, expectedResult, 'it should show patients are compliant');
});*/

test('when a patient has more than two-thirds(66.66%) expired surveys', (t) => {
    const data = [
        {
            completedWeeklyCount: 0,
            expiredWeeklyCount: 1,
            completedDailyCount: 2,
            expiredDailyCount: 5
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [1, 0, 0];

    t.deepEqual(result, expectedResult, 'it should show patient is non-compliant');
});

test('when there are multiple patients with different compliance', (t) => {
    const data = [
        {
            completedWeeklyCount: 0,
            expiredWeeklyCount: 1,
            completedDailyCount: 2,
            expiredDailyCount: 5
        },
        {
            completedWeeklyCount: 1,
            expiredWeeklyCount: 1,
            completedDailyCount: 7,
            expiredDailyCount: 7
        },
        {
            completedWeeklyCount: 1,
            expiredWeeklyCount: 1,
            completedDailyCount: 10,
            expiredDailyCount: 4
        },
        {
            completedWeeklyCount: 3,
            expiredWeeklyCount: 2,
            completedDailyCount: 25,
            expiredDailyCount: 10
        }
    ];

    const result = processComplianceCount(data);

    const expectedResult = [1, 2, 1];

    t.deepEqual(result, expectedResult, 'it should show correct overall compliance counts');
});
