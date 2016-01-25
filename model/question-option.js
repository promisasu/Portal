'use strict';

/**
 * @module model/question-option
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Each multiple choice QuestionTemplate can have many QuestionOption
     * @typedef {Object} QuestionOption
     * @property {String} optionText - text to appear for the option
     * @property {Number} order - Order in which selectable options should appear in question
     */
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
