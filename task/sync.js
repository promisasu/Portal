'use strict';

/**
 * @module task/sync
 */

const database = require('../model');

/**
 * Creates the database tables.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function sync (done) {
    database.setup(require('../config.json').database);
    database.sequelize.sync({force: true})
        .then(() => {
            database.sequelize.close();
            done();
        });
}

sync.description = 'Creates the database tables.';

module.exports = sync;
