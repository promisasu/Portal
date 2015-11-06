'use strict';

// load node modules
const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const handlebars = require('handlebars');

// load router and database
const dashboardRouter = require('./controller/router');
const apiRouter = require('./api/router');
const database = require('./model');

module.exports = function (configuration) {
    const server = new hapi.Server();

    // register hapi plugins
    server.register(
        [
            {
                register: vision
            }
        ],
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );

    // register handlebars view engine
    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: path.join(__dirname, 'view'),
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

    // configure server connection
    server.connection({
        port: configuration.server.port,
        host: configuration.server.hostname
    });

    // configure database connection
    database.setup(configuration.database);

    // load application routes
    server.route(dashboardRouter);
    server.route(apiRouter);

    return server;
};
