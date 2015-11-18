'use strict';

/**
 * @module controller/helper/process-trial
 */

const moment = require('moment');

/**
 * Takes in a Trial model and processes them into human readable format
 * @param {Trial} currentTrial - a single Trial object
 * @returns {Object} processed Trial
 */
function processTrial (currentTrial) {
    const trial = currentTrial.dataValues;
    const startDate = moment(trial.IRBStart);
    const endDate = moment(trial.IRBEnd);
    const statuses = ['Pending', 'Upcoming', 'In Progress', 'Completed'];
    const status = statuses[Math.floor(Math.random() * 4)];
    const targetCount = trial.targetCount;
    // TODO: Currently fake data, make this live data
    const recruitedCount = targetCount - 153;
    const activeCount = recruitedCount - 23;
    const compliantCount = activeCount - 67;

    return {
        id: trial.id,
        name: trial.name,
        description: trial.description,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: endDate.format('L'),
        targetCount: targetCount,
        recruitedCount: recruitedCount,
        activeCount: activeCount,
        compliantCount: compliantCount,
        // TODO: Currently fake data, make this live data
        recruitedPercent: (recruitedCount / targetCount * 100).toFixed(2),
        unrecruitedPercent: (100 - recruitedCount / targetCount * 100).toFixed(2),
        activePercent: (activeCount / recruitedCount * 100).toFixed(2),
        completedPercent: (100 - activeCount / recruitedCount * 100).toFixed(2),
        compliantPercent: (compliantCount / activeCount * 100).toFixed(2),
        noncompliantPercent: (100 - compliantCount / activeCount * 100).toFixed(2),
        noncompliantCount: compliantCount - activeCount,
        status: status
    };
}

module.exports = processTrial;
