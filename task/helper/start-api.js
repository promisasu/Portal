'use strict';

/**
 * @module task/dev-api
 * Starts the api in the console process.
 * This allows for `console.log` to be used for debugging.
 */

const config = require('../../config.json');
const server = require('../../api/server')(config);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
