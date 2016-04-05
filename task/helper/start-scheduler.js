'use strict';

/**
 * @module task/helper/start-scheduler
 * Starts the scheduler in the console process.
 * This is a cron job for creating survey instances for all patients and expiring past due surveys.
 */

const moment = require('moment');
const configuration = require('../../config.json');
const expireSurveyInstances = require('../../rule/task/expire-survey-instances');
const runSurveyRules = require('../../rule/task/run-survey-rules');
const database = require('../../model');

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

// The scheduler is only supposed to run off a cron job
// however this code will be triggered everytime the server is started
// meaning survey instances can be generated when they should not be
// this attempts to prevent that by checking if time is between 11:59p and 12:01a

// Logically this looks at a single day
// and looks for times before 12:01 or after 11:59
// on a timeline this would look like
//
// 12:00 12:01 Today 11:59 12:00
// |<=====O-------------O=====>|
if (now < afterMidnight || now > beforeMidnight) {
    database.setup(configuration.database);

    expireSurveyInstances()
    .then((data) => {
        return console.log(data[0], 'survey instances expired');
    })
    .catch((err) => {
        console.error(err);
    });

    runSurveyRules()
    .then(() => {
        return console.log('survey instances created on:', new Date());
    })
    .catch((err) => {
        console.error(err);
    });
}
