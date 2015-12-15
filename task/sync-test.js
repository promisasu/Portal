'use strict';

/**
 * @module task/sync-test
 */

const database = require('../model');

/**
 * Creates the database tables for test.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function syncTest (done) {
    const config = require('../config.json');

    config.database.name = 'prp_test';
    database.setup(config.database);
    database.sequelize.sync({force: true})
        .then(() => {
            database.sequelize.close();
            done();
        });
}

syncTest.description = 'Creates the database tables for test.';

module.exports = syncTest;
