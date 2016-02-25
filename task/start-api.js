'use strict';
const processManager = require('pm2');
const path = require('path');

processManager.connect(() => {
    processManager.start(
        {
            name: 'prp-api',
            script: path.resolve('task', 'helper', 'start-api.js'),
            error_file: path.resolve('logs', `${Date.now()}-prp-api-error.log`),
            out_file: path.resolve('logs', `${Date.now()}-prp-api-out.log`)
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
