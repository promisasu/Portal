'use strict';

/**
 * @module model/join-current-and-next-stage
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * Give a rule to describe when one stage should transition to another
     * @typedef {Object} JoinCurrentAndNext
     * @property {String} rule - Rule that describes transition to next stage
     */
    sequelize.define(
        'join_current_and_next_stages',
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
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
