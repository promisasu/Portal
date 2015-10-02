'use strict';

const read = require('read');

module.exports = function (options) {
    return new Promise(function (resolve, reject) {
        read(options, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
