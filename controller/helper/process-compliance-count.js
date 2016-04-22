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
    const complianceCountIncrement = 1;
    const compliance = {
        compliant: 0,
        semiCompliant: 0,
        nonCompliant: 0
    };

    for (const row of rows) {
        if (row.expiredCount > nonCompliantThreshold) {
            compliance.nonCompliant += complianceCountIncrement;
        } else if (row.expiredCount > semiCompliantThreshold) {
            compliance.semiCompliant += complianceCountIncrement;
        } else {
            compliance.compliant += complianceCountIncrement;
        }
    }

    return [compliance.nonCompliant, compliance.semiCompliant, compliance.compliant];
}

module.exports = processComplianceCount;
