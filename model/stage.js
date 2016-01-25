'use strict';

/**
 * @module model/stage
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * A Stage represents a group of Patients' state in a Trial
     * @typedef {Object} Stage
     * @property {String} name - name of the Stage
     */
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
