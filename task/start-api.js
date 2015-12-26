'use strict';

/**
 * @module task/start-api
 */

/**
 * Starts the api as a system service.
 * This allows for running on a production server.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function startApi (done) {
    const processManager = require('pm2');
    const path = require('path');

    processManager.connect(() => {
        processManager.start(
            {
                name: 'prp-api',
                script: path.resolve(__dirname, 'helper', 'start-api.js')
            },
            () => {
                processManager.disconnect(done);
            }
        );
    });
}

startApi.description = 'Starts the api as a system service.';

module.exports = startApi;
