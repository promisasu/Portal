'use strict';

/**
 * @module controller/helper/process-trial
 */

const moment = require('moment');
const twoDecimalPoints = 2;
const fakeData = {
    numberOfStatuses: 4,
    targetOffset: 152,
    recruitedOffset: 23,
    activeOffset: 67,
    multiplier: 100
};

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
    const status = statuses[Math.floor(Math.random() * fakeData.noncompliantCount)];
    const targetCount = trial.targetCount;
    // TODO: Currently fake data, make this live data
    const recruitedCount = targetCount - fakeData.targetOffset;
    const activeCount = recruitedCount - fakeData.recruitedOffset;
    const compliantCount = activeCount - fakeData.activeOffset;

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
        recruitedPercent: (recruitedCount / targetCount * fakeData.multiplier).toFixed(twoDecimalPoints),
        unrecruitedPercent: (fakeData.multiplier - recruitedCount / targetCount * fakeData.multiplier)
            .toFixed(twoDecimalPoints),
        activePercent: (activeCount / recruitedCount * fakeData.multiplier).toFixed(twoDecimalPoints),
        completedPercent: (fakeData.multiplier - activeCount / recruitedCount * fakeData.multiplier)
            .toFixed(twoDecimalPoints),
        compliantPercent: (compliantCount / activeCount * fakeData.multiplier).toFixed(twoDecimalPoints),
        noncompliantPercent: (fakeData.multiplier - compliantCount / activeCount * fakeData.multiplier)
            .toFixed(twoDecimalPoints),
        noncompliantCount: compliantCount - activeCount,
        status: status
    };
}

module.exports = processTrial;
