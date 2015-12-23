'use strict';

/**
 * @module task/seed
 */

const database = require('../model');
const seedData = require('./helper/seed-data');

/**
 * Adds seed values in the database.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function seed (done) {
    database.setup(require('../config.json').database); // eslint-disable-line global-require

    Promise.all([
        database.sequelize.model('trial').bulkCreate(seedData.trials)
    ])
    .then(() => {
        database.sequelize.close();
        done();
    });
}

seed.description = 'Adds seed values in the database.';

module.exports = seed;
