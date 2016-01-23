'use strict';

/**
 * @module model/survey-instance
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each SurveyInstance consists of many QuestionResults
     * @typedef {Object} SurveyInstance
     * @property {String} name - SurveyInstance name
     * @property {Date} startTime - when the survey is availible
     * @property {Date} endTime - when the survey must be completed
     * @property {Date} userSubmissionTime - time that patient submitted survey on application
     * @property {Date} actualSubmissionTime - time that the server marked survey as completed
     * @property {String} state - current state of SurveyInstance
     */
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
            state: {
                type: Sequelize.ENUM,
                values: ['pending', 'in progress', 'completed', 'expired', 'invalid', 'cancelled'],
                defaultValue: 'pending',
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
