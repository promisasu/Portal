'use strict';

/**
 * @module task/seed-test
 */

const database = require('../model');
const seedData = require('./helper/seed-data');

/**
 * Adds seed values in the database for test.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function seedTest (done) {
    const config = require('../config.json'); // eslint-disable-line global-require

    config.database.name = 'prp_test';
    database.setup(config.database);

    Promise.all([
        database.sequelize.model('trial').bulkCreate(seedData.trials)
    ])
    .then(() => {
        database.sequelize.close();
        done();
    });
}

seedTest.description = 'Adds seed values in the database for test.';

module.exports = seedTest;
