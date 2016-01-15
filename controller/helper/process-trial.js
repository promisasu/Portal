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

    return {
        targetCount: null,
        recruitedCount: null,
        activeCount: null,
        compliantCount: null,
        status: null,
        id: trial.id,
        name: trial.name,
        description: trial.description,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: endDate.format('L'),
        recruitedPercent: null,
        unrecruitedPercent: null,
        activePercent: null,
        completedPercent: null,
        compliantPercent: null,
        noncompliantPercent: null,
        noncompliantCount: null
    };
}

module.exports = processTrial;
