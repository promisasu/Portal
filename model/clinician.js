'use strict';

/**
 * @module model/clinician
 */

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

/**
 * a Clinician has one or more Trials
 * @typedef {Object} Clinician
 * @property {String} username - Clinician username
 * @property {String} password - A setter to generate passwordHash
 * @property {String} passwordHash - Clinician's salted and hashed password
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @param {String} salt - salt value to use when hashing password
 * @returns {Null} nothing
 */
function register (sequelize, salt) {
    sequelize.define(
        'clinician',
        {
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    // Username is only Latin letters
                    // and is 5-25 characters in length
                    isAlpha: true,
                    len: [5, 25]
                }
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                // plain text password is not stored
                type: Sequelize.VIRTUAL,
                set: function (password) {
                    // runs password against validator
                    this.setDatValue('password', password);
                    // stores salted and hashed password
                    bcrypt.hash(password, salt, (err, res) => {
                        if (err) {
                            console.error(err);
                        } else {
                            this.setDatValue('passwordHash', res);
                        }
                    });
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
