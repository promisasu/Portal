'use strict';
const processManager = require('pm2');
const path = require('path');

processManager.connect(() => {
    processManager.start(
        {
            name: 'prp-dashboard',
            script: path.resolve('task', 'helper', 'start-dashboard.js'),
            error_file: path.resolve('logs', `${Date.now()}-prp-dashboard-error.log`),
            out_file: path.resolve('logs', `${Date.now()}-prp-dashboard-out.log`)
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
