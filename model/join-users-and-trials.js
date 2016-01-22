'use strict';

/**
 * @module model/join-users-and-trials
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * This joins the User table and Trial table
     * @typedef {Object} JoinUsersAndTrials
     */
    sequelize.define(
        'join_users_and_trials',
        {},
        {
            paranoid: true
        }
    );
}

module.exports = register;
