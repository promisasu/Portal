'use strict';

/**
 * @module model/stage
 */

const Sequelize = require('sequelize');

/**
 * a Stage is a collection of EventListeners used to evaluate a Patient
 * and to generate new SurveyInstances for a Patient
 * @typedef {Object} EventListener
 * @property {String} name - name of the Stage
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('stage',
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
};
