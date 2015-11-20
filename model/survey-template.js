'use strict';

/**
 * @module model/survey-template
 */

const Sequelize = require('sequelize');

/**
 * a SurveyTemplate is a list of QuestionTemplates that a Patient can answer.
 * @typedef {Object} SurveyTemplate
 * @property {String} name - survey template name
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'survey_template',
        {
            name: {
                type: Sequelize.STRING,
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
