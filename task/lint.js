'use strict';

/**
 * @module task/lint
 */

/**
 * Checks that Javascript, Cascading Stylesheets and Markdown are valid.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function lint (done) {
    const npm = require('npm');
    const npmPackage = require('../package.json');

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

lint.description = 'Checks that Javascript, Cascading Stylesheets and Markdown are valid.';

module.exports = lint;
