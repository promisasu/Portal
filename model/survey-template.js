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

module.exports = function (sequelize) {
    sequelize.define('survey_template',
        {
            name: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true
        }
    );
};
