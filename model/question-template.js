'use strict';

/**
 * @module model/question-template
 */

const Sequelize = require('sequelize');

/**
 * a SurveyTemplate consists of multiple QuestionTemplates
 * @typedef {Object} QuestionTemplate
 * @property {String} name - question name
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
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
                values: ['multipleChoice', 'bodyPain'],
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
