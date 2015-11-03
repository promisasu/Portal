'use strict';

/**
 * @module task/stop
 */

const processManager = require('pm2');

/**
 * Stops the server system service.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function stop (done) {
    processManager.connect(() => {
        processManager.delete('prp-server', () => {
            processManager.disconnect(done);
        });
    });
}

stop.description = 'Stops the server system service.';

module.exports = stop;
