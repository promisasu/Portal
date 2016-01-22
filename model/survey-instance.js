'use strict';

/**
 * @module model/survey-instance
 */

const Sequelize = require('sequelize');

/**
 * Each SurveyInstance consists of many QuestionResults
 * @typedef {Object} SurveyInstance
 * @property {String} name - SurveyInstance name
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'survey_instance',
        {
            startTime: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            userSubmissionTime: {
                type: Sequelize.DATE
            },
            actualSubmissionTime: {
                type: Sequelize.DATE
            },
            surveyInstanceCompleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
