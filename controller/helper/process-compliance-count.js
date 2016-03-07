'use strict';
/**
 * @module controller/handler/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @param {Array<Object>} rows - aggregated survey information
 * @returns {Array<Number>} count of redCount, yellowCount and greenCount
 */
function processComplianceCount (rows) {
    const zero = 0;
    const redThreshold = 2;
    const yellowThresholdBegin = 0;
    const redIndex = 0;
    const yellowIndex = 1;
    const greenIndex = 2;
    const compliance = [zero, zero, zero];

    for (const row of rows) {
        if (row.expiredCount > redThreshold) {
            compliance[redIndex] += 1;
        } else if (row.expiredCount > yellowThresholdBegin && row.expiredCount <= redThreshold) {
            compliance[yellowIndex] += 1;
        } else {
            compliance[greenIndex] += 1;
        }
    }

    return compliance;
}
module.exports = processComplianceCount;
