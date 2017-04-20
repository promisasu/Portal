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
    const allPercent = processPercent(trial);

    return Object.assign(trial, {
        start: moment(trial.IRBStart).format('MM-DD-YYYY'),
        end: moment(trial.IRBEnd).format('MM-DD-YYYY'),
        recruitedPercent: allPercent.recruitedPercent,
        unrecruitedPercent: allPercent.unrecruitedPercent,
        activePercent: allPercent.activePercent,
        completedPercent: allPercent.completedPercent
    });
}

/**
 * Takes in a Trial model and processes to provide percent calculation
 * @param {Trial} trial - a single Trial object
 * @returns {Object} calculated Percent
 */
function processPercent (trial) {
    const percent = 100;
    const zeroPercent = 0;

    if (trial.recruitedCount > zeroPercent) {
        return {
            recruitedPercent: Math.round(trial.recruitedCount / trial.TargetCount * percent),
            unrecruitedPercent: Math.round((trial.TargetCount - trial.recruitedCount) / trial.TargetCount * percent),
            completedPercent: Math.round(trial.completedCount / trial.recruitedCount * percent),
            activePercent: Math.round(trial.activeCount / trial.recruitedCount * percent)
        };
    }

    return {
        recruitedPercent: Math.round(trial.recruitedCount / trial.TargetCount * percent),
        unrecruitedPercent: Math.round((trial.TargetCount - trial.recruitedCount) / trial.TargetCount * percent),
        completedPercent: zeroPercent,
        activePercent: zeroPercent
    };
}

module.exports = processTrial;
module.exports.processPercent = processPercent;
