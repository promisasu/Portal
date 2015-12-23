'use strict';

/**
 * @module task/seed
 */

const database = require('../model');
const seedData = require('./helper/seed-data');

/**
 * Adds seed values in the database.
 * @param {Function} done - completion callback
 * @returns {Null} nothing
 */
function seed (done) {
    database.setup(require('../config.json').database); // eslint-disable-line global-require

    Promise.all([
        database.sequelize.model('trial').bulkCreate(seedData.trial),
        database.sequelize.model('question_option').bulkCreate(seedData.questionOption),
        database.sequelize.model('question_template').bulkCreate(seedData.questionTemplate),
        database.sequelize.model('join_questions_and_options').bulkCreate(seedData.joinQuestionsAndOptions),
        database.sequelize.model('survey_template').bulkCreate(seedData.surveyTemplate),
        database.sequelize.model('join_trials_and_surveys').bulkCreate(seedData.joinTrialsAndSurveys),
        database.sequelize.model('join_surveys_and_questions').bulkCreate(seedData.joinSurveysAndQuestions)
    ])
    .then(() => {
        database.sequelize.close();
        done();
    });
}

seed.description = 'Adds seed values in the database.';

module.exports = seed;
