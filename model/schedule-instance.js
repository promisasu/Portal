'use strict';

/**
 * @module model/schedule
 */

const Sequelize = require('sequelize');

/**
 * A ScheduleInstance links ScheduleTemplate, Patient and a SurveyTemplate.
 * Letting the Patient know when their next Survey is done.
 * @typedef {Object} ScheduleInstance
 * @property {String} name - schedule name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('schedule_instance',
        {
          
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};
