'use strict';

/**
 * @module task/stop-api
 */

/**
 * Stops the api system service.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function stopApi (done) {
    const processManager = require('pm2');

    processManager.connect(() => {
        processManager.delete('prp-api', () => {
            processManager.disconnect(done);
        });
    });
}

stopApi.description = 'Stops the api system service.';

module.exports = stopApi;
