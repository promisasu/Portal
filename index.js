'use strict';
/**
 * @module main
 * Exports the Dashboard and API server functions
 * Allowing other packages to import this package
 * and use an alternative setup to the dev tasks bundled currently
 */

exports.dashboard = require('./controller/server');
exports.api = require('./api/server');
