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

    read({
        prompt: 'hostname:',
        default: 'localhost'
    })
    .then(function (hostname) {
        config.hostname = hostname;

        return read({
            prompt: 'port number:',
            default: 3000
        });
    })
    .then(function (port) {
        config.port = port;
        writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, 2));
    });
};
