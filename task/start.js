'use strict';

/**
 * @module task/start
 */

const processManager = require('pm2');
const path = require('path');

/**
 * Starts the server as a system service.
 * This allows for running on a production server.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function start (done) {
    processManager.connect(() => {
        processManager.start(
            {
                name: 'prp-server',
                script: path.resolve(__dirname, 'helper', 'start-server.js')
            },
            () => {
                processManager.disconnect(done);
            }
        );
    });
}

start.description = 'Starts the server as a system service.';

module.exports = start;
