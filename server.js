'use strict';

// load node modules
const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const handlebars = require('handlebars');

// load router
const router = require('./router');

module.exports = function (configuration) {
    const server = new hapi.Server();

    // register hapi plugins
    server.register(
        [
            {
                register: vision
            }
        ],
        function (err) {
            if (err) {
                console.log(err);
            }
        }
    );

    // register handlebars view engine
    server.views({
        engines: {
            handlebars: handlebars
        },
        relativeTo: path.join(__dirname, 'view'),
        // templates that views can render
        path: 'template',
        // layouts that templates can extend
        layoutPath: 'layout',
        // sets default layout to 'layout/default.handlebars'
        layout: 'default'
    });

    // set server port
    server.connection({
        port: configuration.server.port,
        host: configuration.server.hostname
    });

    // load application routes
    server.route(router);

    // start the server
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
};
