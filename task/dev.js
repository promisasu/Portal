'use strict';

/**
 * @module task/dev
 */

/**
 * Starts the server in the console process.
 * This allows for `console.log` to be used for debugging.
 * @returns {Null} nothing
 */
function dev () {
    require('./helper/start-server'); // eslint-disable-line global-require
}

dev.description = 'Starts the server in the console process.';

module.exports = dev;
