'use strict';

const fs = require('fs');

module.exports = function (filename, data, options) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, data, options, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
