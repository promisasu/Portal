'use strict';

const test = require('ava');
const processPatientStatus = require('../helper/process-patient-status');

test('when patient has no expired surveys', (t) => {
    const data = {
        expiredCount: 0
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        expiredCount: 0,
        status: 'Compliant'
    };

    t.deepEqual(result, expectedResult, 'it should return row with compliant status');
});

test('when patient has one expired survey', (t) => {
    const data = {
        expiredCount: 1
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        expiredCount: 1,
        status: 'Semi-Compliant'
    };

    t.deepEqual(result, expectedResult, 'it should return row with semi-compliant status');
});

test('when patient has two expired surveys', (t) => {
    const data = {
        expiredCount: 2
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        expiredCount: 2,
        status: 'Semi-Compliant'
    };

    t.deepEqual(result, expectedResult, 'it should return row with semi-compliant status');
});

test('when patient has three expired surveys', (t) => {
    const data = {
        expiredCount: 3
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        expiredCount: 3,
        status: 'Non-Compliant'
    };

    t.deepEqual(result, expectedResult, 'it should return row with non-compliant status');
});
