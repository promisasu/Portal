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
