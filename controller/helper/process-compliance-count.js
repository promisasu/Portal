'use strict';
/**
 * @module controller/handler/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @param {Array<Object>} rows - aggregated survey information
 * @returns {Array<Number>} count of redCount, yellowCount and greenCount
 */
function getCount (rows) {
    const redThreshold = 2;
    const yellowThresholdBegin = 0;
    let redCount = 0;
    let yellowCount = 0;
    let greenCount = 0;

    for (const row of rows) {
        if (row.expiredCount > redThreshold) {
            redCount += 1;
        } else if (row.expiredCount > yellowThresholdBegin && row.expiredCount <= redThreshold) {
            yellowCount += 1;
        } else {
            greenCount += 1;
        }
    }
    return [redCount, yellowCount, greenCount];
}
module.exports = getCount;
