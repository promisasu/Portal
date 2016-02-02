'use strict';

/**
 * @module task/sync
 * Creates the database tables.
 */

const database = require('../model');

database.setup(require('../config.json').database);
database
.sequelize
.sync({force: true})
.then(() => {
    database.sequelize.close();
})
.catch((err) => {
    database.sequelize.close();
    console.error(err);
});
