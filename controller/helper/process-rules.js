'use strict';

/**
 * @module controller/helper/process-rules
 */

const moment = require('moment');
const initRule = 0;

/**
 * A rule processor for calculating end date of patient in trial.
 * @param {Array<Number>} rules - A list of lengths in days
 * @param {Date} start - Start date of patient
 * @returns {String} Formatted end date
 */
function processRule (rules, start) {
    const ruleTotal = rules.reduce((preVal, postVal) => {
        return preVal + postVal;
    }, initRule);

    return moment(start).add(ruleTotal, 'days').format('YYYY-MM-DD');
}

module.exports = processRule;
