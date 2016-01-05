'use strict';

/**
 * @module task/start-dashboard
 * Starts the dashboard as a system service.
 * This allows for running on a production server.
 */

const processManager = require('pm2');
const path = require('path');

processManager.connect(() => {
    processManager.start(
        {
            name: 'prp-dashboard',
            script: path.resolve(__dirname, 'dev-dashboard.js')
        },
        () => {
            processManager.disconnect();
        }
    );
});
