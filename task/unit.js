'use strict';

/**
 * @module task/unit
 */

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Runs the unit tests.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function unit (done) {
    npm.load(npmPackage, (err) => {
        if (err) {
            console.log(err);
        }
        npm.commands.runScript(['test'], (err) => {
            if (err) {
                console.log(err);
            }
            done();
        });
    });
}

unit.description = 'Runs the unit tests.';

module.exports = unit;
