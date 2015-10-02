'use strict';

/**
 * @module command/dev
 */

const server = require('../server');

/**
 * Starts the server in the console process.
 * This allows for `console.log` to be used for debugging.
 * @function dev
 * @returns {Null} nothing
 */
module.exports = function () {
    server(require('../config.json')); // eslint-disable-line global-require
};
