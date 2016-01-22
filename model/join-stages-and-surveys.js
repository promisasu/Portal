'use strict';

/**
 * @module model/join-stages-and-surveys
 */

const Sequelize = require('sequelize');

/**
 * This joins the Stage table and SurveyTemplate table
 * @typedef {Object} JoinStagesAndSurveys
 * @property {String} rule - Rule that describes when to generate SurveyInstance of SurveyTemplate
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'join_stages_and_surveys',
        {
            rule: {
                type: Sequelize.STRING,
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
