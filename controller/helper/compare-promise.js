'use strict';

/**
 * @module controller/helper/compare-promise
 */

let bcrypt = null;

try {
    bcrypt = require('bcrypt');
} catch (err) {
    bcrypt = require('../../bcrypt-shim');
}

/**
 * Checks a value matches its hashed value.
 * @param {Object} value - unhashed value
 * @param {String} hash - hashed value
 * @returns {Promise.<Boolean>} nothing
 */
function comparePromise (value, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(value, hash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports = comparePromise;
