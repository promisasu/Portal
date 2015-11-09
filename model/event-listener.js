'use strict';

/**
 * @module model/event-listener
 */

const Sequelize = require('sequelize');

/**
 * a EventListener is a singe Expert Ruleset
 * @typedef {Object} EventListener
 * @property {String} rule - Rules to listen for
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define(
        'event_listener',
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
};
