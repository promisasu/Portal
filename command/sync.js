'use strict';

/**
 * @module command/sync
 */

const database = require('../model');

/**
 * Creates the database tables
 * @function sync
 * @returns {Null} nothing
 */
module.exports = function () {
    database.setup(require('../config.json').database); // eslint-disable-line global-require
    database.sequelize.sync({force: true});
};
