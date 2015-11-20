'use strict';

const bcrypt = require('bcrypt');

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
