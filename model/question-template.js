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
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('question_template',
        {
            name: {
                type: Sequelize.STRING
            },
            questionType: {
                type: Sequelize.ENUM,
                values: ['multipleChoice','bodyPain']
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};