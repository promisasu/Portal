'use strict';
/**
 * @module controller/helper/process-rule
 */

const moment = require('moment');

/**
 * A rule processing for calculating end date of patient in trial.
 * @param {Number} ruleTotal - number of days
 * @returns {String} Formatted end date
 */
function processRule (ruleTotal) {
    return moment().add(ruleTotal, 'days').format('YYYY-MM-DD');
}

module.exports = processRule;
