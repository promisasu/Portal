'use strict';

/**
 * @module task/start-api
 * Starts the api as a system service.
 * This allows for running on a production server.
 */

const processManager = require('pm2');
const path = require('path');

processManager.connect(() => {
    processManager.start(
        {
            name: 'prp-api',
            script: path.resolve(__dirname, 'dev-api.js')
        },
        () => {
            processManager.disconnect();
        }
    );
});
