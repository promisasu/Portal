'use strict';

/**
 * @module controller/server
 */

// load node modules
const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const authBasic = require('hapi-auth-basic');
const handlebars = require('handlebars');

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

    // configure server connection
    server.connection({
        port: configuration.server.port,
        host: configuration.server.hostname
    });

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
                if (configuration.server.auth !== false) {
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

    return server;
}

module.exports = dashboardServer;
