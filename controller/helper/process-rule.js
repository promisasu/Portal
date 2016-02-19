'use strict';
/**
 * @module controller/helper/process-rule
 */

const moment = require('moment');

/**
 * A rule processing for calculating end date of patient in trial.
 * @param {Object} rules - aggregated rule values
 * @returns {Date} End Date
 */
function processRule (rules) {
    let countOfDays = 0;

    if (typeof rules !== 'undefined' && rules.length) {
        countOfDays = rules[0].rule;
    }
    return moment(moment()).add(countOfDays, 'days').format('YYYY-MM-DD');
}

module.exports = processRule;
