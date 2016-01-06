'use strict';

/**
 * @module task/dev-dashboard
 * Starts the dashboard in the console process.
 * This allows for `console.log` to be used for debugging.
 */

const config = require('../../config.json');
const server = require('../../controller/server')(config);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
