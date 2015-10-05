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
    npm.load(npmPackage, function (err) {
        if (err) {
            console.log(err);
        }
        npm.commands.runScript(['documentation'], function (err) {
            if (err) {
                console.log(err);
            }
            done();
        });
    });
}

doc.description = 'Turns documentation comments into viewable wep pages.';

module.exports = doc;
