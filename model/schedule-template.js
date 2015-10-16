'use strict';

/**
 * @module model/schedule-type
 */

const Sequelize = require('sequelize');

/**
 * a ScheduleTemplate defines a time span for a repeating and a priority for a ScheduleInstance.
 * @typedef {Object} ScheduleTemplate
 * @property {String} name - schedule name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('schedule_template',
        {
            name: {
                type: Sequelize.STRING
            },
            interval: {
                type: Sequelize.INTEGER
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};
