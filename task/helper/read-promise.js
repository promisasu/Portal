'use strict';

const read = require('read');

module.exports = function (options) {
    return new Promise((resolve, reject) => {
        read(options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
