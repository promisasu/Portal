'use strict';

/**
 * @module model/join-surveys-and-questions
 */
const Sequelize = require('sequelize');

/**
 * This joins the SurveyTemplate table and QuestionTemplate table
 * @typedef {Object} JoinSurveysAndQuestions
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define(
        'join_surveys_and_questions',
        {
            questionOrder: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            paranoid: true
        }
    );
};
