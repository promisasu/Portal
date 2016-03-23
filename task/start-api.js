'use strict';

/**
 * @module task/start-api
 * Starts api server.
 */

const processManager = require('pm2');
const path = require('path');
const configuration = require('../config.json');

processManager.connect(() => {
    processManager.start(
        {
            name: `prp-${configuration.environment}-api`,
            script: path.resolve('task', 'helper', 'start-api.js'),
            error_file: path.resolve('logs', `${Date.now()}-prp-${configuration.environment}-api-error.log`),
            out_file: path.resolve('logs', `${Date.now()}-prp-${configuration.environment}-api-out.log`),
            log_date_format: 'x'
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
