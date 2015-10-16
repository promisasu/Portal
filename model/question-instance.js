'use strict';

/**
 * @module model/question-instance
 */

/**
 * Each QuestionInstance will have associated with it a Patient and SurveyInstance
 * This will provide an overview of the answers submitted by the Patient for
 * each question from that SurveyInstance.
 * @typedef {Object} QuestionInstance
 * @property {String} name - QuestionInstance name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('question_instance',
       {},
       {
            freezeTableName: true,
            paranoid: true
        }
    );
};
