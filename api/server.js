'use strict';

/**
 * @module api/server
 */

// load node modules
const fs = require('fs');
const good = require('good');
const goodFile = require('good-file');
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
    const connectionOptions = {
        port: configuration.api.port,
        host: configuration.api.hostname
    };

    if (configuration.tls) {
        connectionOptions.tls = {
            key: fs.readFileSync(configuration.tls.key),
            cert: fs.readFileSync(configuration.tls.cert)
        };
        if (configuration.tls.passphrase) {
            connectionOptions.tls.passphrase = configuration.tls.passphrase;
        }
    }

    // configure server connection
    server.connection(connectionOptions);

    server.register(
        {
            register: good,
            options: {
                reporters: [{
                    reporter: goodFile,
                    events: {
                        error: '*',
                        log: '*',
                        ops: '*',
                        request: '*',
                        response: '*'
                    },
                    config: `./logs/${Date.now()}-prp-${configuration.environment}-api-access.log`
                }]
            }
        },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );

    // configure database connection
    database.setup(configuration.database);

    // load application routes
    server.route(router);

    return server;
}

module.exports = apiServer;
