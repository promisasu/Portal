'use strict';

/**
 * @module controller/server
 */

// load node modules
const authBasic = require('hapi-auth-basic');
const fs = require('fs');
const good = require('good');
const goodFile = require('good-file');
const handlebars = require('handlebars');
const hapi = require('hapi');
const inert = require('inert');
const path = require('path');
const vision = require('vision');

// load router and database
const router = require('./router');
const database = require('../model');
const validate = require('./helper/validate');

/**
 * Sets up a the Hapi server
 * @param {Object} configuration - server options
 * @returns {Object} Hapi server instance
 */
function dashboardServer (configuration) {
    const server = new hapi.Server();
    const connectionOptions = {
        port: configuration.dashboard.port,
        host: configuration.dashboard.hostname
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

    // register hapi plugins
    server.register(
        [
            {
                register: vision
            },
            {
                register: inert
            },
            {
                register: authBasic
            },
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
                        config: `./logs/${Date.now()}-prp-${configuration.environment}-dashboard-access.log`
                    }]
                }
            }
        ],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                // Secure dashboard with login
                server.auth.strategy(
                    'simple',
                    'basic',
                    {
                        validateFunc: validate
                    }
                );

                // allow authentication to be disabled for test
                if (configuration.dashboard.authentication !== false) {
                    server.auth.default('simple');
                }
            }
        }
    );

    // register handlebars view engine
    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: path.join(__dirname, '..', 'view'),
        // templates that views can render
        path: 'template',
        // layouts that templates can extend
        layoutPath: 'layout',
        // partial elements that can be mixed into pages
        partialsPath: 'partial',
        // helpers to generate snippets programatticaly
        helpersPath: 'helper',
        // sets default layout to 'layout/default.handlebars'
        layout: 'default'
    });

    // configure database connection
    database.setup(configuration.database);

    // load application routes
    server.route(router);
    if (configuration.application) {
        server.route({
            method: 'GET',
            path: '/promis/{param*}',
            handler: {
                directory: {
                    path: configuration.application.path
                }
            },
            config: {
                auth: false
            }
        });
    }

    return server;
}

module.exports = dashboardServer;
