'use strict';

/**
 * @module task/sync-test
 * Creates the database tables for test.
 */

const database = require('../model');
const config = require('../config.json');

config.database.name = 'portal_test';
database.setup(config.database);
database.sequelize.sync({force: true})
.then(() => {
    database.sequelize.close();
})
.catch((err) => {
    database.sequelize.close();
    console.error(err);
});
