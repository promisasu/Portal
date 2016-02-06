'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');

/**
 * A dashboard with an overview of a specific trial.
 * @function getCount
 * @param {row} row - Hapi request
 * @returns {Array} count of redCount, yellowCount and greenCount
 */
function getCount (row) {
    let redCount = 0;
    let yellowCount = 0;
    let greenCount = 0;
    const redThreshold = 2;
    const yellowThresholdBegin = 0;
    let firstrow = null;
    let item = null;

    for (item of row) {
        firstrow = item;
    }

    for (let index = 0; index < firstrow.length; index += 1) {
        if (firstrow[index].expiredCount > redThreshold) {
            redCount += 1;
        } else if ((firstrow[index].expiredCount > yellowThresholdBegin) && (firstrow[index].expiredCount <= redThreshold)) {
            yellowCount += 1;
        } else {
            greenCount += 1;
        }
    }
    return [redCount, yellowCount, greenCount];
}
module.exports = getCount;
