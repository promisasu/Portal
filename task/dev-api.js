'use strict';

/**
 * @module task/dev-api
 */

/**
 * Starts the api in the console process.
 * This allows for `console.log` to be used for debugging.
 * @returns {Null} nothing
 */
function devApi () {
    require('./helper/start-api'); // eslint-disable-line global-require
}

devApi.description = 'Starts the api in the console process.';

module.exports = devApi;
