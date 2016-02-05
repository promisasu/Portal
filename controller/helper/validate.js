'use strict';

/**
 * @module controller/helper/validate
 */

const compare = require('./compare-promise');
const database = require('../../model');

/**
 * Checks that a login is valid
 * @param {Object} request - Hapi request
 * @param {String} username - username for login
 * @param {String} password - password for login
 * @param {Function} callback - alerts Hapi if login is valid or not
 * @returns {Null} nothing
 */
function validate (request, username, password, callback) {
    const user = database.sequelize.model('user');
    let selectedUser = null;

    // search for selected user
    user
    .find({
        where: {
            username
        }
    })
    // if user does not exist error out
    .then((currentUser) => {
        selectedUser = currentUser;

        return new Promise((resolve, reject) => {
            if (selectedUser) {
                resolve();
            } else {
                reject();
            }
        });
    })
    // test that the password given matches the password stored
    .then(() => {
        return compare(password, selectedUser.passwordHash);
    })
    .then((isValid) => {
        callback(null, isValid, selectedUser);
    })
    .catch((err) => {
        console.error(err);
        callback(err, false, {});
    });
}

module.exports = validate;
