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
    npm.load(npmPackage, (err) => {
        if (err) {
            console.log(err);
        }
        npm.commands.runScript(['lint'], (err) => {
            if (err) {
                console.log(err);
            }
            done();
        });
    });
}

lint.description = 'Checks that the Javascript code is valid.';

module.exports = lint;
