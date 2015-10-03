'use strict';

/**
 * @module task/dev
 */

const server = require('../server');

/**
 * Starts the server in the console process.
 * This allows for `console.log` to be used for debugging.
 * @returns {Null} nothing
 */
function dev () {
    server(require('../config.json')); // eslint-disable-line global-require
}

dev.description = 'Starts the server in the console process.';

module.exports = dev;
