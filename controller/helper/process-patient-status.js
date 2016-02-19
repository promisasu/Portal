'use strict';
/**
 * @module controller/handler/process-patient-status
 */

/**
 * A dashboard with an overview of a specific trial.
 * @param {Array<Object>} rows - aggregated survey information
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
