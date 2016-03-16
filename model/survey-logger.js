'use strict';

/**
 * @module model/survey-logger
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each QuestionResult will be associated with a SurveyInstance and a QuestionOption
     * This represents a single response to a Survey QuestionTemplate
     * @typedef {Object} SurveyLogger
     * @property {String} eventName - The event captured from the app
     * @property {String} metaData - The metadata - PIN, SurveyInstanceID, Question ID, Answer ID related to the event
     * @property {Date} start - The timestamp captured when this event occurred in the app.
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
            start: {
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
