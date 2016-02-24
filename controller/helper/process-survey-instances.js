'use strict';

/**
 * @module controller/helper/process-survey-instances
 */

const moment = require('moment');

/**
 * Takes in a Survey Instances and processes it to get Complience chart details
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} Complience chart data
 */
function processSurveyInstances (surveys) {
    return {
        // Using UTC as the date gets modified to the local time (GMT in this case) when UTC not used.
        labels: pickDates(surveys),
        datasets: pickTimeLeft(surveys)
    };
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of datetimes
 */
function pickDates (surveys) {
    const dates = surveys.map((survey) => {
        return moment(new Date(survey.startTime).toISOString()).utc().format('MM/DD/YYYY HH:mm');
    });

    const lastDate = moment(new Date(surveys[0]
        .dateCompleted)
        .toISOString()).utc().format('MM/DD/YYYY HH:mm');
    const missingValue = -1;

    if (dates.indexOf(lastDate) <= missingValue) {
        dates.push(lastDate);
    }
    return dates;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft (surveys) {
    // Using UTC as the date gets modified to the local time (GMT in this case) when UTC not used.
    const percentages = surveys.map((suvey) => {
        return calculateTimeLeft(
            moment(new Date(suvey.startTime).toISOString()).utc(),
            moment(new Date(suvey.endTime).toISOString()).utc(),
            moment(new Date(suvey.actualSubmissionTime).toISOString()).utc()
        );
    });

    return [{
        label: '% Time left until daily survey expired',
        data: percentages
    }];
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Moment} openTime - When survey instance became availible
 * @param {Moment} endTime - When the survey instance is no longer availible to be taken
 * @param {Moment} completedTime - When the survey instance was actually completed
 * @returns {Number} percent time left after completing survey instance
 */
function calculateTimeLeft (openTime, endTime, completedTime) {
    const percent = 100;
    const minTime = 0;

    // calculate the time in hours until end time
    const totalAvailibleTime = openTime.diff(endTime, 'hours');
    const timeTaken = completedTime.diff(endTime, 'hours');

    // caculate percent of time taken out of total time availible to take the survey
    const percentTimeLeft = Math.round(timeTaken / totalAvailibleTime * percent);

    // either take the amount of time left
    // or if the survey instance expired (negative percent) show zero time left
    return Math.max(percentTimeLeft, minTime);
}

module.exports = processSurveyInstances;
