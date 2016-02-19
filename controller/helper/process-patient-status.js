'use strict';
/**
 * @module controller/handler/process-patient-status
 */

/**
 * A function to assign compliance status to each patient record from a Trial.
 * @param {Array<Object>} rows - all patient records in a Trial
 * @returns {Array<Object>} rows - updated rows object with compliance status set for each record
 */
function processPatientStatus (rows) {
    const redThreshold = 2;
    const yellowThresholdBegin = 0;

    if (rows.expiredCount > redThreshold) {
        rows.status = 'Non-Compliant';
    } else if (rows.expiredCount > yellowThresholdBegin && rows.expiredCount <= redThreshold) {
        rows.status = 'Semi-compliant';
    } else {
        rows.status = 'Compliant';
    }

    return rows;
}

module.exports = processPatientStatus;
