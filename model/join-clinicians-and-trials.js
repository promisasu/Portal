'use strict';

/**
 * @module model/join-clinicians-and-trials
 */

/**
 * This joins the Clinician table and Trial table
 * @typedef {Object} JoinCliniciansAndTrials
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'join_clinicians_and_trials',
        {},
        {
            paranoid: true
        }
    );
}

module.exports = register;
