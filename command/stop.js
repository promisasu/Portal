'use strict';

/**
 * @module command/stop
 */

const processManager = require('pm2');

/**
 * Stops the server system process.
 * @function stop
 * @returns {Null} nothing
 */
module.exports = function () {
    processManager.connect(function () {
        processManager.delete('prp-server', disconnect);
    });
};

/**
 * disconnects from PM2 manager instance
 * @private
 * @returns {Null} nothing
 */
function disconnect () {
    processManager.disconnect();
}
