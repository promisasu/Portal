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
    for (const row of rows){
      row.expiredWeeklyCount = row.expiredWeeklyCount * 3;
      row.completedWeeklyCount = row.completedWeeklyCount * 3;
    }
    const nonCompliantThreshold = 66.67;
    const increment = 1;
    const semiCompliantThreshold = 33.33;
    const compliance = {
        compliant: 0,
        semiCompliant: 0,
        nonCompliant: 0
    };

    for (const row of rows) {
        var compliancePercentage = (row.expiredWeeklyCount + row.expiredDailyCount)/(row.expiredWeeklyCount + row.expiredDailyCount + row.completedWeeklyCount + row.completedDailyCount);
        if (compliancePercentage >= nonCompliantThreshold) {
            compliance.nonCompliant += increment;
        } else if (compliancePercentage >= semiCompliantThreshold) {
            compliance.semiCompliant += increment;
        } else {
            compliance.compliant += increment;
        }
    }

    return [compliance.nonCompliant, compliance.semiCompliant, compliance.compliant];
}

module.exports = processComplianceCount;
