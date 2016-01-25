'use strict';

/**
 * @module model/patient
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * a Patient is a person in a Stage of a clinical Trial
     * and is filling out SurveyInstances and QuestionResults
     * @typedef {Object} Patient
     * @property {Number} pin - Deindentified representation of a patient
     * @property {String} deviceType - Device Patient registered with
     * @property {String} deviceVersion - OS version of device used to register
     * @property {Date} dateStarted - Date Patient began the Trial
     * @property {Date} dateCompleted - Date Patient completed the Trial
     */
    sequelize.define(
        'patient',
        {
            pin: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false
            },
            deviceType: {
                type: Sequelize.ENUM,
                values: ['android', 'ios', 'windows']
            },
            deviceVersion: {
                type: Sequelize.STRING,
                validate: {
                    is: /^[a-z0-9. ]+$/
                }
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
}

module.exports = register;
