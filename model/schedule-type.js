'use strict';

/**
 * @module model/schedule-type
 */

const Sequelize = require('sequelize');

/**
 * a ScheduleType defines a time span for a repeating Schedule.
 * @typedef {Object} ScheduleType
 * @property {String} name - schedule name
 */

module.exports = function (sequelize) {
    sequelize.define('schedule_type',
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
