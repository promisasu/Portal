'use strict';

/**
 * @module api/server
 */

// load node modules
const fs = require('fs');
const good = require('good');
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
        host: configuration.api.hostname,
        routes: {
            cors: true,
            security: true
        }
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
                ops: {
                    interval: 60000
                },
                reporters: {
                    logs: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                error: '*',
                                log: '*',
                                request: '*',
                                response: '*'
                            }]
                        },
                        {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        },
                        {
                            module: 'good-file',
                            args: [
                                `./logs/${Date.now()}-prp-${configuration.environment}-api-access.log`
                            ]
                        }
                    ],
                    ops: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                ops: '*'
                            }]
                        },
                        {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        },
                        {
                            module: 'good-file',
                            args: [
                                `./logs/${Date.now()}-prp-${configuration.environment}-api-ops.log`
                            ]
                        }
                    ]
                }
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
