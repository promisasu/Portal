'use strict';
/**
 * @module controller/handler/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @param {Array<Object>} rows - aggregated survey information
 * @returns {Array<Number>} number of non-compliant, semi-compliant and compliant patients
 */
function processComplianceCount (rows) {
    const nonCompliantThreshold = 2;
    const semiCompliantThreshold = 0;
    const compliance = {
        compliant: 0,
        semiCompliant: 0,
        nonCompliant: 0
    };

    for (const row of rows) {
        if (row.expiredCount > nonCompliantThreshold) {
            compliance.nonCompliant += 1;
        } else if (row.expiredCount > semiCompliantThreshold) {
            compliance.semiCompliant += 1;
        } else {
            compliance.compliant += 1;
        }
    }

    return [compliance.nonCompliant, compliance.semiCompliant, compliance.compliant];
}

module.exports = processComplianceCount;
