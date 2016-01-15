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
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'question_option',
        {
            optionText: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 0
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
