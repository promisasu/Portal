'use strict';

/**
 * @module task/helper/write-file-promise
 */

const fs = require('fs');

/**
 * Writes a string to the file system
 * @param {String} filename - path and name of file
 * @param {String} data - content of file
 * @param {Object} options - fs options
 * @returns {Promise} resolves on completion
 */
function writeFilePromise (filename, data, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, options, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = writeFilePromise;
