'use strict';
const processManager = require('pm2');
const path = require('path');

processManager.connect(() => {
    processManager.start(
        {
            name: 'prp-scheduler',
            script: path.resolve('task', 'helper', 'start-scheduler.js'),
            error_file: path.resolve('logs', `${Date.now()}-prp-scheduler-error.log`),
            out_file: path.resolve('logs', `${Date.now()}-prp-scheduler-out.log`),
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
