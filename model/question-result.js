'use strict';

/**
 * @module model/question-result
 */

/**
 * Each QuestionResult will be associated with a SurveyInstance and a QuestionOption
 * This represents a single response to a Survey QuestionTemplate
 * @typedef {Object} QuestionResult
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'question_result',
        {},
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
