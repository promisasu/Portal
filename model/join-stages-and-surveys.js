'use strict';

/**
 * @module model/join-stages-and-surveys
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * This joins the Stage table and SurveyTemplate table
     * @typedef {Object} JoinStagesAndSurveys
     * @property {String} rule - Rule that describes when to generate SurveyInstance of SurveyTemplate
     */
    sequelize.define(
        'join_stages_and_surveys',
        {
            rule: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            stagePriority: {
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
