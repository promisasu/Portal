'use strict';

/**
 * @module model/question
 */

const Sequelize = require('sequelize');

/**
 * a Survey consists of multiple Questions
 * @typedef {Object} Question
 * @property {String} name - question name
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('question',
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
