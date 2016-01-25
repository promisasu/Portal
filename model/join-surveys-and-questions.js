'use strict';

/**
 * @module model/join-surveys-and-questions
 */
const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * This joins the SurveyTemplate table and QuestionTemplate table
     * @typedef {Object} JoinSurveysAndQuestions
     * @property {Number} questionOrder - the ordering for where this question should appear in a survey
     */
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
}

module.exports = register;
