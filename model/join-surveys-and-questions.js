'use strict';

/**
 * @module model/join-surveys-and-questions
 */

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
    sequelize.define('join_surveys_and_questions', {}, {paranoid: true});
};
