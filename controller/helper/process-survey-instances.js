'use strict';
const moment = require('moment');
/**
 * @module controller/helper/process-survey-instances
 */

/**
 * Takes in a Survey Instances and processes it to get Complience chart details
 * @param {Object} surveys - list of survey instances
 * @returns {Object} Complience chart data
 */
function processSurveyInstances (surveys) {
    return {
        // Using UTC as the date gets modified to the local time (GMT in this case) when UTC not used.
        labels: surveys.map((survey) => {
            return moment(survey.startTime).utc().format('MM/DD/YYYY HH:mm');
        }),
        datasets: pickTimeLeft(surveys)
    };
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft (surveys) {
    // Using UTC as the date gets modified to the local time (GMT in this case) when UTC not used.
    const percentages = surveys.map((suvey) => {
        return calculateTimeLeft(
            moment(suvey.startTime).utc(),
            moment(suvey.endTime).utc(),
            moment(suvey.actualSubmissionTime).utc()
        );
    });

    return [{
        label: '% Time left until daily survey expired',
        data: percentages
    }];
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} startTime - start time of survey instance
 * @param {Object} endTime - end time of survey instance
 * @param {Object} actualTime - actual time of survey instance
 * @returns {Object} percent time left after completing survey instance
 */
function calculateTimeLeft (startTime, endTime, actualTime) {
    let percentTimeLeft = 0;
    const percent = 100;
    const minTime = 0;
    const timeToCompleteSurvey = endTime.diff(startTime, 'hours');
    const timeTaken = endTime.diff(actualTime, 'hours');

    if (timeTaken > minTime) {
        percentTimeLeft = timeTaken / timeToCompleteSurvey;
    }
    return Math.round(percentTimeLeft * percent);
}
module.exports = processSurveyInstances;
