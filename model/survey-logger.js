'use strict';

/**
 * @module model/survey-logger
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @typedef {String} eventName - The event captured from the app
 * @typedef {String} metaData - The metadata - PIN, SurveyInstanceID, Question ID, Answer ID related to the event
 * @typedef {Date} startTime - The timestamp captured when this event occurred in the app.
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each QuestionResult will be associated with a SurveyInstance and a QuestionOption
     * This represents a single response to a Survey QuestionTemplate
     * @typedef {Object} SurveyLogger
     */
    sequelize.define(
        'survey_logger',
        {
            eventName: {
                type: Sequelize.STRING
            },
            metaData: {
                type: Sequelize.STRING
            },
            startTime: {
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
