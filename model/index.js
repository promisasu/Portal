'use strict';

/**
 * @module model/index
 */

const Sequelize = require('sequelize');
const addTrialModel = require('./trial');
const addSurveyTemplateModel = require('./survey-template');

/**
 * a DatabaseConfiguration is a collection of the settings needed to connect to the database.
 * @typedef {Object} DatabaseConfiguration
 * @property {String} name - database name
 * @property {String} username - database user login name
 * @property {String} password - database user login password
 * @property {String} hostname - host where the database server can be found
 * @property {String} dialet - type of SQL server running the database
 */

/**
 * Takes in database configuration and returns Sequelize object
 * that is both configured and has the models attached
 * @exports setup
 * @function setup
 * @param {DatabaseConfiguration} configuration - settings for connecting to database
 * @returns {Sequelize} configured sequelize object
 */
module.exports.setup = function (configuration) {
    // setup database connection
    const sequelize = new Sequelize(configuration.name, configuration.username, configuration.password, {
        host: configuration.hostname,
        dialect: configuration.dialect,

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    // add models to sequelize
    addTrialModel(sequelize);
    addSurveyTemplateModel(sequelize);

    // export configured sequelize to allow for access to database models
    module.exports.sequelize = sequelize;
    return sequelize;
};
