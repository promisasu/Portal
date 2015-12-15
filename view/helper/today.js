'use strict';

const moment = require('moment');

function today () {
    return moment().format('YYYY-MM-DD');
}

module.exports = today;
