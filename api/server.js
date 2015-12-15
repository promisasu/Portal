'use strict';

// load node modules
const hapi = require('hapi');

// load router and database
const router = require('./router');
const database = require('../model');

/**
 * Sets up a the Hapi server
 * @param {Object} configuration - server options
 * @returns {Object} Hapi server instance
 */
function apiServer (configuration) {
    const server = new hapi.Server();

    // configure server connection
    server.connection({
        port: configuration.api.port,
        host: configuration.api.hostname
    });

    // configure database connection
    database.setup(configuration.database);

    // load application routes
    server.route(router);

    return server;
}

module.exports = apiServer;
