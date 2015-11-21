'use strict';

/**
 * @module model/rule
 */

const Sequelize = require('sequelize');

/**
 * a Rule is a singe Expert Ruleset
 * @typedef {Object} EventListener
 * @property {String} rule - Rules to listen for
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'rule',
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
