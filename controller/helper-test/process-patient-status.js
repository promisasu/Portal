'use strict';

const test = require('ava');
const processPatientStatus = require('../helper/process-patient-status');

test('when patient has no expired surveys and no pending surveys', (t) => {
    const data = {
        compliancePercentage: 100,
        deactivatedCount: 0,
        pendingCount: 0
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        compliancePercentage: 100,
        deactivatedCount: 0,
        pendingCount: 0,
        status: 'Compliant',
        trialStatus: 'Completed',
        trendingCompliance: ' ---- '
    };

    t.deepEqual(result, expectedResult,
      'it should return row with compliant status and a trial status of "Completed"');
});

test('when patient has 50% expired surveys and a deactived count of more than zero', (t) => {
    const data = {
        compliancePercentage: 50,
        deactivatedCount: 1,
        pendingCount: 10
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        compliancePercentage: 50,
        deactivatedCount: 1,
        pendingCount: 10,
        status: 'Partially-Compliant',
        trialStatus: 'DEACTIVATED',
        trendingCompliance: ' ---- '
    };

    t.deepEqual(result, expectedResult,
      'it should return row with semi-compliant status and a trial status of "DEACTIVATED"');
});

test('when patient has 40% expired surveys and has a pending count of more than 0', (t) => {
    const data = {
        compliancePercentage: 40,
        deactivatedCount: 0,
        pendingCount: 10
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        compliancePercentage: 40,
        deactivatedCount: 0,
        pendingCount: 10,
        status: 'Partially-Compliant',
        trialStatus: 'Active'

    };

    t.deepEqual(result, expectedResult,
      'it should return row with semi-compliant status and a trial status of "Active"');
});

test('when patient has more than 66.66% expired surveys and a pending count > 0 and deactivated count > 0', (t) => {
    const data = {
        compliancePercentage: 32,
        deactivatedCount: 0,
        pendingCount: 10
    };

    const result = processPatientStatus(data);

    const expectedResult = {
        compliancePercentage: 32,
        deactivatedCount: 0,
        pendingCount: 10,
        status: 'Non-Compliant',
        trialStatus: 'Active'
    };

    t.deepEqual(result, expectedResult,
      'it should return row with non-compliant status and a trial status of "Active"');
});
