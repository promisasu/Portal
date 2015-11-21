'use strict';

/**
 * @module task/helper/read-promise
 */

const read = require('read');

/**
 * Read values from CLI
 * @param {Object} options - read options
 * @returns {Promise.<String>} value entered
 */
function readPromise (options) {
    return new Promise((resolve, reject) => {
        read(options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = readPromise;
