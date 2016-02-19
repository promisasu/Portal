'use strict';
/**
 * @module controller/helper/process-rule
 */

const moment = require('moment');

/**
 * A rule processing for calculating end date of patient in trial.
 * @param {Object} ruleTotal - aggregated rule values
 * @returns {Date} End Date
 */
function processRule (ruleTotal) {
    return moment(moment()).add(ruleTotal, 'days').format('YYYY-MM-DD');
}

module.exports = processRule;
