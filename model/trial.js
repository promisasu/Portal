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
