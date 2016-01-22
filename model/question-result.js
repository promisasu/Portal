'use strict';

/**
 * @module model/question-result
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each QuestionResult will be associated with a SurveyInstance and a QuestionOption
     * This represents a single response to a Survey QuestionTemplate
     * @typedef {Object} QuestionResult
     */
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
