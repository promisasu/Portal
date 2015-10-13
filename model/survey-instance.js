'use strict';

/**
 * @module model/survey-instance
 */

const Sequelize = require('sequelize');

/**
 * Each Survey-instance consists of many survey instances
 * @typedef {Object} SurveyInstance
 * @property {String} name - SurveyInstance name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('survey_instance',
        {
            name: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};
