'use strict';

/**
 * @module task/start-dashboard
 */

const processManager = require('pm2');
const path = require('path');

/**
 * Starts the dashboard as a system service.
 * This allows for running on a production server.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function startDashboard (done) {
    processManager.connect(() => {
        processManager.start(
            {
                name: 'prp-dashboard',
                script: path.resolve(__dirname, 'helper', 'start-dashboard.js')
            },
            () => {
                processManager.disconnect(done);
            }
        );
    });
}

startDashboard.description = 'Starts the dashboard as a system service.';

module.exports = startDashboard;
