'use strict';

/**
 * @module model/schedule
 */

const Sequelize = require('sequelize');

/**
 * a Schedule table that links ScheduleType, Patient and a SurveyTemplate.
 * @typedef {Object} Schedule
 * @property {String} name - schedule name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('schedule',
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
