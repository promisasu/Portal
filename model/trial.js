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
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true
        }
    );
};
