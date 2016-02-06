'use strict';

/**
 * @module task/helper/start-scheduler
 * Starts the scheduler in the console process.
 * This is a cron job for creating survey instances for all patients.
 */

const configuration = require('../../config.json');
const runSurveyRules = require('../../rule/task/run-survey-rules');

runSurveyRules(configuration.database)
.then(() => {
    console.log('survey instances created on:', new Date());
})
.catch((err) => {
    console.error(err);
});
