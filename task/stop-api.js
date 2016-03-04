'use strict';
const processManager = require('pm2');
const configuration = require('../config.json');

processManager.connect(() => {
    processManager.delete(
        `prp-${configuration.environment}-api`,
        (err) => {
            if (err) {
                console.error(err);
            }
            processManager.disconnect();
        }
    );
});
