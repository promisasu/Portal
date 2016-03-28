'use strict';

/**
 * @module bcrypt-shim
 * This is a shim that allows PRP to run on development without bcrypt being installed.
 * THIS IS INSECURE DO NOT USE IN PRODUCTION.
 */

/**
 * Compares two values
 * @param {String} value - value to test
 * @param {String} hash - test against this
 * @param {Function} callback - function to resolve values to
 * @returns {Null} nothing
 */
function compare (value, hash, callback) {
    callback(null, value === hash);
}

/**
 * Returns value
 * @param {String} value - value to return
 * @returns {String} value
 */
function hashSync (value) {
    return value;
}

/**
 * Fake salt
 * @param {Number} rounds - does nothing
 * @param {Function} callback - function to resolve value to
 * @returns {Null} nothing
 */
function genSalt (rounds, callback) {
    callback(null, 'insecure');
}

module.exports = {compare, hashSync, genSalt};
