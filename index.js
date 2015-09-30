#!/usr/bin/env node
'use strict';

// load node modules
const hapi = require('hapi');
const vision = require('vision');
const jade = require('jade');

// load project modules
const version = require('./package.json').version;
const prpWelcomeView = require('./view/welcome');

// describe command line interface
const argv = require('yargs')
    .usage('prp [options]')
    .option('p', {
        alias: 'port',
        default: 3000,
        describe: 'port to run server on'
    })
    .help('help')
    .alias('h', 'help')
    .version(version)
    .alias('v', 'version')
    .argv;

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

// register jade view engine
server.views({
    engines: {
        jade: jade
    },
    relativeTo: __dirname,
    path: 'template'
});

// set server port
server.connection({
    port: argv.port
});

// load application routes
server.route(prpWelcomeView);

// start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
