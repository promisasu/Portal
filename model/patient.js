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
            pin: {
                type: Sequelize.INTEGER
            },
            deviceType: {
                type: Sequelize.ENUM,
                values: ['android', 'ios', 'windows']
            },
            version: {
                type: Sequelize.STRING
            },
            dateStarted: {
                type: Sequelize.DATE
            },
            dateCompleted: {
                type: Sequelize.DATE
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};
