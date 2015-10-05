'use strict';

/**
 * @module model/question-type
 */

const Sequelize = require('sequelize');

/**
 * Each Question consists of many QuestionTypes
 * @typedef {Object} QuestionType
 * @property {String} name - questionType name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('question_type',
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
