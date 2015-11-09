'use strict';

/**
 * @module task/stop-api
 */

const processManager = require('pm2');

/**
 * Stops the api system service.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function stopApi (done) {
    processManager.connect(() => {
        processManager.delete('prp-api', () => {
            processManager.disconnect(done);
        });
    });
}

stopApi.description = 'Stops the api system service.';

module.exports = stopApi;
