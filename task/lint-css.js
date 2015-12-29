'use strict';

/**
 * @module task/lint-css
 */

/**
 * Checks that the Cascading Stylesheet code is valid.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function lintCSS (done) {
    const npm = require('npm');
    const npmPackage = require('../package.json');

    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['lint-css'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
            done();
        });
    });
}

lintCSS.description = 'Checks that the Cascading Stylesheet code is valid.';

module.exports = lintCSS;
