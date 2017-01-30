'use strict';

/**
 * @module model/index
 */

const Sequelize = require('sequelize');

// Database Models
const addUserModel = require('./user');
const addTrialModel = require('./trial');
const addPatientModel = require('./patient');
const addStage = require('./stage');
const addSurveyTemplateModel = require('./survey-template');
const addSurveyInstanceModel = require('./survey-instance');
const addQuestionTemplateModel = require('./question-template');
const addQuestionResultModel = require('./question-result');
const addQuestionOptionModel = require('./question-option');
const addSurveyLoggerModel = require('./survey-logger');

// Database Join Tables
const addJoinUsersAndTrials = require('./join-users-and-trials');
const addJoinStagesAndSurveys = require('./join-stages-and-surveys');
const addJoinSurveysAndQuestions = require('./join-surveys-and-questions');
const addJoinCurrentAndNextStages = require('./join-current-and-next-stages');

// Database Views
const addViewActivePatients = require('./view-active-patients');

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
 * @param {DatabaseConfiguration} configuration - settings for connecting to database
 * @returns {Sequelize} configured sequelize object
 */
function setup (configuration) {
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
    addUserModel(sequelize, configuration.salt);
    addTrialModel(sequelize);
    addPatientModel(sequelize);
    addStage(sequelize);
    addSurveyTemplateModel(sequelize);
    addSurveyInstanceModel(sequelize);
    addQuestionTemplateModel(sequelize);
    addQuestionResultModel(sequelize);
    addQuestionOptionModel(sequelize);
    addSurveyLoggerModel(sequelize);

    // add the many to many join tables
    addJoinUsersAndTrials(sequelize);
    addJoinStagesAndSurveys(sequelize);
    addJoinSurveysAndQuestions(sequelize);
    addJoinCurrentAndNextStages(sequelize);

    // add the database views
    addViewActivePatients(sequelize);

    // Get the newly created ORM wrappers
    const user = sequelize.model('user');
    const trial = sequelize.model('trial');
    const patient = sequelize.model('patient');
    const stage = sequelize.model('stage');
    const questionResult = sequelize.model('question_result');
    const questionOption = sequelize.model('question_option');
    const questionTemplate = sequelize.model('question_template');
    const surveyInstance = sequelize.model('survey_instance');
    const surveyTemplate = sequelize.model('survey_template');

    // Get the join tables
    const joinUsersAndTrials = sequelize.model('join_users_and_trials');
    const joinStagesAndSurveys = sequelize.model('join_stages_and_surveys');
    const joinSurveysAndQuestions = sequelize.model('join_surveys_and_questions');
    const joinCurrentAndNextStages = sequelize.model('join_current_and_next_stages');

    // establish relationships between tables

    /* ===== ONE TO MANY ===== */
    trial.hasMany(stage);
    patient.hasMany(surveyInstance);
    stage.hasMany(patient);
    surveyTemplate.hasMany(surveyInstance);
    surveyInstance.hasMany(questionResult);
    questionTemplate.hasMany(questionOption);
    questionOption.hasMany(questionResult);

    /* ===== MANY TO MANY ===== */
    stage.belongsToMany(surveyTemplate, {through: joinStagesAndSurveys});
    surveyTemplate.belongsToMany(stage, {through: joinStagesAndSurveys});

    surveyTemplate.belongsToMany(questionTemplate, {through: joinSurveysAndQuestions});
    questionTemplate.belongsToMany(surveyTemplate, {through: joinSurveysAndQuestions});

    user.belongsToMany(trial, {through: joinUsersAndTrials});
    trial.belongsToMany(user, {through: joinUsersAndTrials});

    stage.belongsToMany(stage, {as: 'nextStage', through: joinCurrentAndNextStages});

    // export configured sequelize to allow for access to database models
    module.exports.sequelize = sequelize;

    return sequelize;
}

/**
 * Takes in database configuration and returns Sequelize object
 * that is both configured and has the models attached
 * @param {DatabaseConfiguration} configuration - settings for connecting to database
 * @returns {Sequelize} configured sequelize object
 */

function setupUser(configuration){
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
  addUserModel(sequelize, configuration.salt);

  // Get the newly created ORM wrappers
  const user = sequelize.model('user');

  // export configured sequelize to allow for access to database models
  module.exports.sequelize = sequelize;

  return sequelize;

}

module.exports.setup = setup;
module.exports.setupUser = setupUser;
