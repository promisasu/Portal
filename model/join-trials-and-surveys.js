'use strict';

/**
 * @module model/join-trails-and-surveys
 */

/**
 * This joins the Trial table and SurveyTemplate table
 * @typedef {Object} JoinTrailsAndSurveys
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('join_trials_and_surveys', {}, {paranoid: true});
};
