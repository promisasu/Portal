'use strict';

/**
 * @module model/question-template
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * a SurveyTemplate consists of multiple QuestionTemplates
     * @typedef {Object} QuestionTemplate
     * @property {String} questionText - Prompt for patient to answer question
     * @property {String} questionType - Either multiple choice or body pain
     */
    sequelize.define(
        'question_template',
        {
            questionText: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            questionType: {
                type: Sequelize.ENUM,
                values: ['multiChoiceSingleAnswer', 'bodyPain'],
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
