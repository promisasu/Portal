'use strict';

/**
 * @module task/stop-dashboard
 */

const processManager = require('pm2');

/**
 * Stops the dashboard system service.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function stopDashboard (done) {
    processManager.connect(() => {
        processManager.delete('prp-dashboard', () => {
            processManager.disconnect(done);
        });
    });
}

stopDashboard.description = 'Stops the dashboard system service.';

module.exports = stopDashboard;
