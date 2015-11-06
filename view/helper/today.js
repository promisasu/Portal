'use strict';

const moment = require('moment');

module.exports = function () {
    const today = moment(new Date());

    return today.format('YYYY-MM-DD');
};
