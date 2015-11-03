'use strict';

/**
 * @module task/init
 */

const path = require('path');
const read = require('./helper/read-promise');
const writeFile = require('./helper/write-file-promise');

/**
 * Writes a server configuration file.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function init (done) {
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
    .then((serverHostname) => {
        config.server = {};
        config.server.hostname = serverHostname;

        return read({
            prompt: 'port number:',
            default: 3000
        });
    })
    .then((port) => {
        config.server.port = port;

        console.log('');
        console.log('setup for pain reporting portal database');
        console.log('');

        return read({
            prompt: 'hostname:',
            default: 'localhost'
        });
    })
    .then((databaseHostname) => {
        config.database = {};
        config.database.hostname = databaseHostname;

        return read({
            prompt: 'database name:',
            default: 'prp_development'
        });
    })
    .then((databaseName) => {
        config.database.name = databaseName;

        return read({
            prompt: 'username:',
            default: 'developer'
        });
    })
    .then((databaseUsername) => {
        config.database.username = databaseUsername;

        return read({
            prompt: 'password:',
            default: 'password'
        });
    })
    .then((databasePassword) => {
        config.database.password = databasePassword;

        return read({
            prompt: 'SQL server:',
            default: 'mysql'
        });
    })
    .then((dialect) => {
        config.database.dialect = dialect;

        writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, 2));
    })
    .then(done);
}

init.description = 'Writes a server configuration file.';

module.exports = init;
