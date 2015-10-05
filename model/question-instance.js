'use strict';

/**
 * @module model/question-instance
 */

const Sequelize = require('sequelize');

/**
 * Each Question-instance will have associated with it a patient_id and survey_instance
 * This will provide an overview of the answers submitted by the patient for 
 * each question from that survey instance.
 * @typedef {Object} SurveyInstance
 * @property {String} name - SurveyInstance name
 */

module.exports = function (sequelize) {
    sequelize.define('question_instance',
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
