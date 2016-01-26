'use strict';

/**
 * @module model/trial
 */

const Sequelize = require('sequelize');

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    /**
     * a clinical Trial has many Stages for Patients to take Surveys
     * @typedef {Object} Trial
     * @property {String} name - trial name
     * @property {String} description - short blurb about the trial
     * @property {String} IRBID - Institutional Review Board Identifier
     * @property {Date} IRBStart - Institutional Review Board permit starts
     * @property {Date} IRDEnd - Institutional Review Board permit ends
     * @property {Number} targetCount - Number of Patients that will participate in Trial
     * @property {Number} patientPinCounter - Count off patient id within Trial
     */
    sequelize.define(
        'trial',
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
            IRBStart: {
                type: Sequelize.DATE,
                allowNull: false
            },
            IRBEnd: {
                type: Sequelize.DATE,
                allowNull: false
            },
            targetCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            patientPinCounter: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        }
    );
}

module.exports = register;
