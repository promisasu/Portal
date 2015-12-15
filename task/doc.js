'use strict';

/**
 * @module task/doc
 */

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Turns documentation comments into viewable wep pages.
 * @function doc
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function doc (done) {
    npm.load(npmPackage, (loadErr) => {
        if (loadErr) {
            console.log(loadErr);
        }
        npm.commands.runScript(['documentation'], (commandErr) => {
            if (commandErr) {
                console.log(commandErr);
            }
            done();
        });
    });
}

doc.description = 'Turns documentation comments into viewable wep pages.';

module.exports = doc;
