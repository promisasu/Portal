'use strict';

/**
 * @module model/survey-response-logger
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @typedef {Date} answered - Timestamp collected when the lastest question option was selected in the app
 * @typedef {Date} previous - Most recent timestamp collected when the previous button was clicked for the question
 * @typedef {Date} next - Most recent timestamp collected when the next button was clicked for the question
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each SurveyResponseLogger will be associated with a completed SurveyInstance.
     * Each record represents the timestamps associated with when the question was answered.
     * It also holds the timestamps for next and previous buttons pressed for each question while filling the survey.
     * @typedef {Object} SurveyResponseLogger
     */
    sequelize.define(
        'survey_response_logger',
        {
            answered: {
                type: Sequelize.DATE
            },
            previous: {
                type: Sequelize.DATE
            },
            next: {
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
