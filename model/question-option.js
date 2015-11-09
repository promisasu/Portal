'use strict';

/**
 * @module model/question-option
 */

const Sequelize = require('sequelize');

/**
 * Each multiple choice question can have many QuestionOption
 * @typedef {Object} QuestionOption
 * @property {String} name - questionOption name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define(
        'question_option',
        {
            optionText: {
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
};
