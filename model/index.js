'use strict';

/**
 * @module model/index
 */

const Sequelize = require('sequelize');
const addTrialModel = require('./trial');
const addPatientModel = require('./patient');
const addSurveyTemplateModel = require('./survey-template');
const addSurveyInstanceModel = require('./survey-instance');
const addScheduleTemplateModel = require('./schedule-template');
const addScheduleInstanceModel = require('./schedule-instance');
const addQuestionTemplateModel = require('./question-template');
const addQuestionInstanceModel = require('./question-instance');
const addQuestionOptionModel = require('./question-option');

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
    addPatientModel(sequelize);
    addSurveyTemplateModel(sequelize);
    addSurveyInstanceModel(sequelize);
    addScheduleTemplateModel(sequelize);
    addScheduleInstanceModel(sequelize);
    addQuestionTemplateModel(sequelize);
    addQuestionInstanceModel(sequelize);
    addQuestionOptionModel(sequelize);

    // Get the newly created ORM wrappers
    const patient = sequelize.model('patient');
    const questionInstance = sequelize.model('question_instance');
    const questionOption = sequelize.model('question_option');
    const questionTemplate = sequelize.model('question_template');
    const scheduleInstance = sequelize.model('schedule_instance');
    const scheduleTemplate = sequelize.model('schedule_template');
    const surveyInstance = sequelize.model('survey_instance');
    const surveyTemplate = sequelize.model('survey_template');
    const trial = sequelize.model('trial');

    // establish relationships between tables

    /* ===== ONE TO MANY ===== */
    patient.hasMany(surveyInstance);
    questionTemplate.hasMany(questionInstance);
    scheduleTemplate.hasMany(scheduleInstance);
    scheduleTemplate.hasMany(surveyTemplate);
    surveyInstance.hasMany(questionInstance);
    surveyTemplate.hasMany(surveyInstance);
    trial.hasMany(patient);

    /* ===== MANY TO MANY ===== */
    // surveyTemplate.belongsToMany(trial);
    // trial.belongsToMany(surveyTemplate);
    //
    // questionTemplate.belongsToMany(surveyTemplate);
    // surveyTemplate.belongsToMany(questionTemplate);
    //
    // questionOption.belongsToMany(questionTemplate);
    // questionTemplate.belongsToMany(questionOption);
    //
    // scheduleInstance.belongsToMany(patient, surveyTemplate);
    // surveyTemplate.belongsToMany(scheduleInstance);
    // patient.belongsToMany(scheduleInstance);

    // export configured sequelize to allow for access to database models
    module.exports.sequelize = sequelize;
    return sequelize;
};
