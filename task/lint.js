'use strict';

/**
 * @module task/test
 */

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Checks that the Javascript code is valid.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function lint (done) {
    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['lint'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
            done();
        });
    });
}

lint.description = 'Checks that the Javascript code is valid.';

module.exports = lint;
