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
    const weeklyActivityWeight = 3;

    for (const row of rows) {
        row.expiredWeeklyCount *= weeklyActivityWeight;
        row.completedWeeklyCount *= weeklyActivityWeight;
    }
    const nonCompliantThreshold = 33.33;
    const increment = 1;
    const semiCompliantThreshold = 66.67;
    const compliance = {
        compliant: 0,
        semiCompliant: 0,
        nonCompliant: 0
    };

    const percent = 100;
    const decimal = 2;

    for (const row of rows) {
        let compliancePercentage = (row.completedWeeklyCount + row.completedDailyCount)
                  / (row.expiredWeeklyCount + row.expiredDailyCount
                  + row.completedWeeklyCount + row.completedDailyCount)
                  * percent;
        let trendingCompliance = (row.completedTrendingWeeklyCount + row.completedTrendingDailyCount)
                  / (row.expiredTrendingWeeklyCount + row.expiredTrendingDailyCount
                  + row.completedTrendingWeeklyCount + row.completedTrendingDailyCount)
                  * percent;

        compliancePercentage = parseFloat(compliancePercentage).toFixed(decimal);
        trendingCompliance = parseFloat(trendingCompliance).toFixed(decimal);
        row.compliancePercentage = compliancePercentage;
        row.trendingCompliance = trendingCompliance;
        if (compliancePercentage <= nonCompliantThreshold) {
            compliance.nonCompliant += increment;
        } else if (compliancePercentage <= semiCompliantThreshold) {
            compliance.semiCompliant += increment;
        } else {
            compliance.compliant += increment;
        }
    }

    return [compliance.nonCompliant, compliance.semiCompliant, compliance.compliant];
}

module.exports = processComplianceCount;
