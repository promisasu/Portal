'use strict';
/**
 * @module controller/handler/process-patient-status
 */

/**
 * A function to assign compliance status to each patient record from a Trial.
 * @param {Object} row - single patient record in a Trial
 * @returns {Object} row - updated patient record with compliance status set
 */
function processPatientStatus (row) {
    const redThreshold = 4;
    const yellowThresholdBegin = 0;

    if (row.expiredCount > redThreshold) {
        row.status = 'Non-Compliant';
    }else {
        row.status = 'Compliant';
    }

    return row;
}

module.exports = processPatientStatus;
