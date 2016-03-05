'use strict';

/**
 * @module task/stop-dashboard
 * Stops dashboard server.
 */

const processManager = require('pm2');
const configuration = require('../config.json');

processManager.connect(() => {
    processManager.delete(
        `prp-${configuration.environment}-dashboard`,
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
