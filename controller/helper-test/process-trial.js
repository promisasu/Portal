'use strict';

const test = require('ava');
const processTrial = require('../helper/process-trial');

test('when there are recruited patients', (t) => {
    const data = {
        activeCount: 1,
        completedCount: 1,
        recruitedCount: 2,
        TargetCount: 4
    };

    const result = processTrial.processPercent(data);

    const expectedResult = {
        recruitedPercent: 50,
        unrecruitedPercent: 50,
        completedPercent: 50,
        activePercent: 50
    };

    t.deepEqual(
        result,
        expectedResult,
        'it should have half of the desired patients recruited, and half of the recruited patients completed'
    );
});

test('when there are no recruited patients', (t) => {
    const data = {
        activeCount: 0,
        completedCount: 0,
        recruitedCount: 0,
        TargetCount: 4
    };

    const result = processTrial.processPercent(data);

    const expectedResult = {
        recruitedPercent: 0,
        unrecruitedPercent: 100,
        completedPercent: 0,
        activePercent: 0
    };

    t.deepEqual(result, expectedResult, 'it should have all unrecruited and nothing else');
});

test('when trial is processed', (t) => {
    const data = {
        activeCount: 0,
        completedCount: 0,
        description: 'example',
        IRBStart: '01-01-2001',
        IRBEnd: '01-01-2001',
        recruitedCount: 0,
        TargetCount: 4
    };

    const result = processTrial(data);

    const expectedResult = {
        // old keys
        activeCount: 0,
        completedCount: 0,
        description: 'example',
        IRBStart: '01-01-2001',
        IRBEnd: '01-01-2001',
        recruitedCount: 0,
        TargetCount: 4,
        // new keys
        start: '01-01-2001',
        end: '01-01-2001',
        recruitedPercent: 0,
        unrecruitedPercent: 100,
        completedPercent: 0,
        activePercent: 0
    };

    t.deepEqual(
        result,
        expectedResult,
        'it should format dates, add percentages, and pass through other keys unmodified'
    );
});
