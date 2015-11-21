'use strict';

/**
 * @module model/join-questions-and-options
 */

const Sequelize = require('sequelize');

/**
 * This joins the QuestionTemplate table and QuestionOption table
 * @typedef {Object} JoinQuestionsAndOptions
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'join_questions_and_options',
        {
            optionOrder: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            paranoid: true
        }
    );
}

module.exports = register;
