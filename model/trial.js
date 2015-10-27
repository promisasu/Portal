'use strict';

/**
 * @module model/trial
 */

const Sequelize = require('sequelize');

/**
 * a clinical Trial has many Patients taking Surveys
 * @typedef {Object} Trial
 * @property {String} name - trial name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('trial',
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 3
                }
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            IRBID: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 4
                }
            },
            startAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            targetPatientCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
};
