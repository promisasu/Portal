'use strict';

/**
 * @module model/trial
 */

const Sequelize = require('sequelize');

/**
 * a clinical Trial has many Patients taking Surveys
 * @typedef {Object} Trial
 * @property {String} name - trial name
 * @property {String} description - short blurb about the trial
 * @property {String} IRBID - Institutional Review Board Identifier
 * @property {Date} IRBStart - Institutional Review Board permit starts
 * @property {Date} IRDEnd - Institutional Review Board permit ends
 * @property {Number} targetCount - Number of Patients that will participate in Trial
 * @property {Number} patientPinCounter - Count off patient id within Trial
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
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
};
