'use strict';

/**
 * @module command/start
 */

const processManager = require('pm2');
const path = require('path');

/**
 * Starts the server in a system process.
 * This allows for running prp on a production server.
 * @function start
 * @returns {Null} nothing
 */
module.exports = function () {
    processManager.connect(function () {
        processManager.start(
            {
                name: 'prp-server',
                script: path.resolve(__dirname, 'helper', 'start-server.js')
            },
            disconnect
        );
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
