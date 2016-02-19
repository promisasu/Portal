'use strict';
/**
 * @module controller/handler/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @param {Array<Object>} rows - aggregated survey information
 * @returns {Array<Object>} rows - updated rows object with compliance status set for each record
 */
function processPatientStatus (rows) {
    const redThreshold = 2;
    const yellowThresholdBegin = 0;

    for (const index in rows) {
        if (rows[index].expiredCount > redThreshold) {
            rows[index].status = 'Non-Compliant';
        } else if (rows[index].expiredCount > yellowThresholdBegin && rows[index].expiredCount <= redThreshold) {
            rows[index].status = 'Semi-compliant';
        } else {
            rows[index].status = 'Compliant';
        }
    }

    return rows;
}

module.exports = processPatientStatus;
