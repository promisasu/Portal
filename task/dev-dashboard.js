'use strict';

/**
 * @module task/dev-dashboard
 */

/**
 * Starts the dashboard in the console process.
 * This allows for `console.log` to be used for debugging.
 * @returns {Null} nothing
 */
function devDashboard () {
    require('./helper/start-dashboard');
}

devDashboard.description = 'Starts the dashboard in the console process.';

module.exports = devDashboard;
