'use strict';

/**
 * @module task/sync
 */

/**
 * Creates the database tables.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function sync (done) {
    const database = require('../model');

    database.setup(require('../config.json').database);
    database.sequelize.sync({force: true})
        .then(() => {
            database.sequelize.close();
            done();
        });
}

sync.description = 'Creates the database tables.';

module.exports = sync;
