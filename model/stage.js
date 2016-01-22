'use strict';

/**
 * @module model/stage
 */

const Sequelize = require('sequelize');

/**
 * A Stage represents a Patient's state in a Trial
 * @typedef {Object} EventListener
 * @property {String} name - name of the Stage
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'stage',
        {
            name: {
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
