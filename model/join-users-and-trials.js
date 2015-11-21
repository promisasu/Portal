'use strict';

/**
 * @module model/join-users-and-trials
 */

/**
 * This joins the User table and Trial table
 * @typedef {Object} JoinUsersAndTrials
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'join_users_and_trials',
        {},
        {
            paranoid: true
        }
    );
}

module.exports = register;
