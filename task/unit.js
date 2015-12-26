'use strict';

/**
 * @module task/unit
 */

/**
 * Runs the unit tests.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function unit (done) {
    const npm = require('npm');
    const npmPackage = require('../package.json');

    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['test'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
            done();
        });
    });
}

unit.description = 'Runs the unit tests.';

module.exports = unit;
