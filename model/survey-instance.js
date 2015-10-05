'use strict';

/**
 * @module model/survey-instance
 */

const Sequelize = require('sequelize');

/**
 * Each Survey-instance consists of many survey instances
 * @typedef {Object} SurveyInstance
 * @property {String} name - SurveyInstance name
 */

module.exports = function (sequelize) {
    sequelize.define('survey_instance',
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
