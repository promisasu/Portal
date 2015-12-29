'use strict';

/**
 * @module task/lint-js
 */

/**
 * Checks that the Javascript code is valid.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function lintJS (done) {
    const npm = require('npm');
    const npmPackage = require('../package.json');

    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['lint-js'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
            done();
        });
    });
}

lintJS.description = 'Checks that the Javascript code is valid.';

module.exports = lintJS;
