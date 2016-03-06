'use strict';

/**
 * @module controller/helper/process-trial
 */

const moment = require('moment');

/**
 * Takes in a Trial model and processes them into human readable format
 * @param {Trial} trial - a single Trial object
 * @returns {Object} processed Trial
 */
function processTrial (trial) {
    const startDate = moment(trial.IRBStart);
    const endDate = moment(trial.IRBEnd);
    const allPercent = processPercent(trial);

    return {
        targetCount: null,
        recruitedCount: trial.recruitedCount,
        activeCount: trial.activeCount,
        compliantCount: null,
        status: null,
        id: trial.id,
        name: trial.name,
        description: trial.description,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: endDate.format('L'),
        recruitedPercent: allPercent.recruitedPercent,
        unrecruitedPercent: allPercent.unrecruitedPercent,
        activePercent: allPercent.activePercent,
        completedPercent: allPercent.completedPercent,
        compliantPercent: null,
        noncompliantPercent: null,
        noncompliantCount: null
    };
}

/**
 * Takes in a Trial model and processes to provide percent calculation
 * @param {Trial} trial - a single Trial object
 * @returns {Object} calculated Percent
 */
function processPercent (trial) {
    const percent = 100;

    return {
        recruitedPercent: Math.round(trial.recruitedCount / trial.targetCount * percent),
        unrecruitedPercent: Math.round((trial.targetCount - trial.recruitedCount) / trial.targetCount * percent),
        completedPercent: Math.round(trial.completedCount / trial.recruitedCount * percent),
        activePercent: Math.round(trial.activeCount / trial.recruitedCount * percent)
    };
}

module.exports = processTrial;
