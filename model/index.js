'use strict';

/**
 * @module model/index
 */

const Sequelize = require('sequelize');

// Database Models
const addTrialModel = require('./trial');
const addPatientModel = require('./patient');
const addSurveyTemplateModel = require('./survey-template');
const addSurveyInstanceModel = require('./survey-instance');
const addQuestionTemplateModel = require('./question-template');
const addQuestionInstanceModel = require('./question-instance');
const addQuestionOptionModel = require('./question-option');

// Database Join Tables
const addJoinTrialsAndSurveys = require('./join-trials-and-surveys');
const addJoinSurveysAndQuestions = require('./join-surveys-and-questions');
const addJoinQuestionsAndOptions = require('./join-questions-and-options');

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
    addQuestionTemplateModel(sequelize);
    addQuestionInstanceModel(sequelize);
    addQuestionOptionModel(sequelize);

    // add the many to many join tables
    addJoinTrialsAndSurveys(sequelize);
    addJoinSurveysAndQuestions(sequelize);
    addJoinQuestionsAndOptions(sequelize);

    // Get the newly created ORM wrappers
    const patient = sequelize.model('patient');
    const questionInstance = sequelize.model('question_instance');
    const questionOption = sequelize.model('question_option');
    const questionTemplate = sequelize.model('question_template');
    const surveyInstance = sequelize.model('survey_instance');
    const surveyTemplate = sequelize.model('survey_template');
    const trial = sequelize.model('trial');

    // Get the join tables
    const joinTrialsAndSurveys = sequelize.model('join_trials_and_surveys');
    const joinSurveysAndQuestions = sequelize.model('join_surveys_and_questions');
    const joinQuestionsAndOptions = sequelize.model('join_questions_and_options');

    // establish relationships between tables

    /* ===== ONE TO MANY ===== */
    patient.hasMany(surveyInstance);
    questionTemplate.hasMany(questionInstance);
    surveyInstance.hasMany(questionInstance);
    surveyTemplate.hasMany(surveyInstance);
    trial.hasMany(patient);
    questionOption.hasMany(questionInstance);

    /* ===== MANY TO MANY ===== */
    trial.belongsToMany(surveyTemplate, {through: joinTrialsAndSurveys});
    surveyTemplate.belongsToMany(trial, {through: joinTrialsAndSurveys});

    surveyTemplate.belongsToMany(questionTemplate, {through: joinSurveysAndQuestions});
    questionTemplate.belongsToMany(surveyTemplate, {through: joinSurveysAndQuestions});

    questionTemplate.belongsToMany(questionOption, {through: joinQuestionsAndOptions});
    questionOption.belongsToMany(questionTemplate, {through: joinQuestionsAndOptions});

    // export configured sequelize to allow for access to database models
    module.exports.sequelize = sequelize;
    return sequelize;
};
