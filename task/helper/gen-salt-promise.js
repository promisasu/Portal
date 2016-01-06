'use strict';

/**
 * @module task/helper/gen-promise-salt
 */

let bcrypt = null;

try {
    bcrypt = require('bcrypt');
} catch (err) {
    bcrypt = require('../../bcrypt-shim');
}

/**
 * Generate salt value for hashing
 * @param {Number} rounds - number of rounds to hash value
 * @returns {Promise.<String>} salt value
 */
function genSaltPromise (rounds) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                resolve(salt);
            }
        });
    });
}

module.exports = genSaltPromise;
