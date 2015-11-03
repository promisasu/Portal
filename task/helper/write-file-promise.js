'use strict';

const fs = require('fs');

module.exports = function (filename, data, options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, options, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
