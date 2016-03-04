'use strict';
const processManager = require('pm2');
const path = require('path');
const configuration = require('../config.json');

processManager.connect(() => {
    processManager.start(
        {
            name: `prp-${configuration.environment}-scheduler`,
            script: path.resolve('task', 'helper', 'start-scheduler.js'),
            error_file: path.resolve('logs', `${Date.now()}-prp-${configuration.environment}-scheduler-error.log`),
            out_file: path.resolve('logs', `${Date.now()}-prp-${configuration.environment}-scheduler-out.log`),
            cron_restart: '0 0 * * *'
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
