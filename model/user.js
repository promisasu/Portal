'use strict';

/**
 * @module model/user
 */

const Sequelize = require('sequelize');

let bcrypt = null;

try {
    bcrypt = require('bcrypt');
} catch (err) {
    bcrypt = require('../bcrypt-shim');
}

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @param {String} salt - salt value to use when hashing password
 * @returns {Null} nothing
 */
function register (sequelize, salt) {
    /**
     * a generic User can be a clinician or an admin
     * @typedef {Object} User
     * @property {String} username - User's screen name
     * @property {String} role - can be 'admin' or 'clinician'
     * @property {String} password - A setter to generate passwordHash
     * @property {String} passwordHash - Users's salted and hashed password
     */
    sequelize.define(
        'user',
        {
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    is: /^[a-z]{5,25}$/i
                }
            },
            role: {
                type: Sequelize.ENUM,
                values: ['admin', 'clinician'],
                allowNull: false
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                // plain text password is not stored
                type: Sequelize.VIRTUAL,
                set (password) {
                    // runs password against validator
                    this.setDataValue('password', password);
                    // stores salted and hashed password
                    this.setDataValue('passwordHash', bcrypt.hashSync(password, salt));
                },
                validate: {
                    // Password must have
                    // At least 1 uppercase letter
                    // At least 1 lower letter
                    // At least 1 number or special character
                    // At least 8 characters in total length
                    is: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
                }
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
