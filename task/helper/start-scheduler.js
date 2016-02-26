'use strict';

/**
 * @module task/helper/start-scheduler
 * Starts the scheduler in the console process.
 * This is a cron job for creating survey instances for all patients.
 */

const moment = require('moment');
const configuration = require('../../config.json');
const runSurveyRules = require('../../rule/task/run-survey-rules');

const one = 1;
const beforeMidnight = moment()
    .endOf('day')
    .subtract(one, 'minute')
    .unix();
const afterMidnight = moment()
    .startOf('day')
    .add(one, 'minute')
    .unix();
const now = moment().unix();

// Check if time is between 11:59p and 12:01a
if (now > beforeMidnight || now < afterMidnight) {
    runSurveyRules(configuration.database)
    .then(() => {
        console.log('survey instances created on:', new Date());
    })
    .catch((err) => {
        console.error(err);
    });
}
