'use strict';

/**
 * @module model/patient
 */

const Sequelize = require('sequelize');

/**
 * a Patient can have one or more Surveys
 * @typedef {Object} Patient
 * @property {String} name - patient name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('patient',
        {
            name: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true
        }
    );
};
