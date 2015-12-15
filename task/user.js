'use strict';

/**
 * @module task/user
 */

const database = require('../model');
const read = require('./helper/read-promise');

/**
 * Creates a new user.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function user (done) {
    database.setup(require('../config.json').database); // eslint-disable-line global-require

    const userModel = database.sequelize.model('user');

    console.log('This utility will walk you through creating a new user.');
    console.log('');

    const newUser = {};

    read({
        prompt: 'username:'
    })
    .then((username) => {
        newUser.username = username;

        return read({
            prompt: 'role:',
            default: 'admin'
        });
    })
    .then((role) => {
        newUser.role = role;

        console.log('');
        console.log('password must have:');
        console.log('at least 1 uppercase letter');
        console.log('at least 1 lower letter');
        console.log('at least 1 number or special character');
        console.log('at least 8 characters in total length');
        console.log('');

        return read({
            prompt: 'password:'
        });
    })
    .then((password) => {
        newUser.password = password;

        return read({
            prompt: 'repeat password:'
        });
    })
    .then((password) => {
        return new Promise((resolve, reject) => {
            if (password === newUser.password) {
                resolve();
            } else {
                reject('passwords did not match');
            }
        });
    })
    .then(() => {
        return userModel.create(newUser);
    })
    .then(() => {
        console.log('');
        console.log('user added');
        database.sequelize.close();
        done();
    })
    .catch((err) => {
        console.error('');
        console.error('/n', 'user could not be created because:');
        console.error(err);
        database.sequelize.close();
        done();
    });
}

user.description = 'Creates a new user.';

module.exports = user;
