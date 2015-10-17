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

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('survey_instance',
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
};
