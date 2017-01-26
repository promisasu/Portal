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
     * @property {String} Name - trial name
     * @property {String} Description - short blurb about the trial
     * @property {String} IRBID - Institutional Review Board Identifier
     * @property {Date} IRBStart - Institutional Review Board permit starts
     * @property {Date} IRDEnd - Institutional Review Board permit ends
     * @property {Number} TargetCount - Number of Patients that will participate in Trial
     * @property {Number} PatientPinCounter - Count off patient id within Trial
     */
    sequelize.define(
        'trial',
        {
            TrialId: {
                type:Sequelize.INTEGER,
                primaryKey: true,
                validate: {
                    notEmpty: true
                }
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 3
                }
            },
            Description: {
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
            TargetCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            PatientPinCounter: {
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
