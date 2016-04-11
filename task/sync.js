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
    return database.sequelize.close();
})
.catch((err) => {
    console.error(err);

    return database.sequelize.close();
});
