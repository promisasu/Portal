'use strict';

/**
 * @module command/init
 */

const path = require('path');
const read = require('./helper/read-promise');
const writeFile = require('./helper/write-file-promise');

/**
 * Writes a server configuration file.
 * @function init
 * @returns {Null} nothing
 */
module.exports = function () {
    const config = {};

    console.log('This utility will walk you through creating a config.json file.');
    console.log('It only covers the most common items, and tries to guess sensible defaults.');
    console.log('');
    console.log('setup for pain reporting portal server');
    console.log('');

    read({
        prompt: 'hostname:',
        default: 'localhost'
    })
    .then(function (serverHostname) {
        config.server = {};
        config.server.hostname = serverHostname;

        return read({
            prompt: 'port number:',
            default: 3000
        });
    })
    .then(function (port) {
        config.server.port = port;

        console.log('');
        console.log('setup for pain reporting portal database');
        console.log('');

        return read({
            prompt: 'hostname:',
            default: 'localhost'
        });
    })
    .then(function (databaseHostname) {
        config.database = {};
        config.database.hostname = databaseHostname;

        return read({
            prompt: 'database name:',
            default: 'prp-development'
        });
    })
    .then(function (databaseName) {
        config.database.name = databaseName;

        return read({
            prompt: 'username:',
            default: 'prp-developer'
        });
    })
    .then(function (databaseUsername) {
        config.database.username = databaseUsername;

        return read({
            prompt: 'password:',
            default: 'password'
        });
    })
    .then(function (databasePassword) {
        config.database.password = databasePassword;

        writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, 2));
    });
};
