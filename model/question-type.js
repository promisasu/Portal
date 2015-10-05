'use strict';

/**
 * @module model/question-type
 */

const Sequelize = require('sequelize');

/**
 * Each Question consists of many QuestionTypes
 * @typedef {Object} QuestionType
 * @property {String} name - questionType name
 */

module.exports = function (sequelize) {
    sequelize.define('question-type',
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
