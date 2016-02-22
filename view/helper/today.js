'use strict';

const moment = require('moment');

/**
 * Gets today's date
 * @returns {String} today's date
 */
function today () {
    return moment().format('YYYY-MM-DD');
}

module.exports = today;
