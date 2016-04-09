'use strict';

/**
 * @module controller/helper/process-survey-instances
 */

const moment = require('moment');

const sqlDateFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
const viewDateFormat = 'MM-DD-YYYY HH:mm';

/**
 * Takes in a Survey Instances and processes it to get Complience chart details
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} Complience chart data
 */
function processSurveyInstances (surveys) {
    const filterSurveyByState = surveys.filter((survey) => {
        return survey.state === 'completed';
    });

    return {
        labels: pickDates(filterSurveyByState),
        datasets: pickTimeLeft(filterSurveyByState)
    };
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of datetimes
 */
function pickDates (surveys) {
    const dates = surveys.map((survey) => {
        return moment(survey.startTime, sqlDateFormat).format(viewDateFormat);
    });

    if (surveys[0]) {
        dates.push(moment(surveys[0].dateCompleted, sqlDateFormat).format(viewDateFormat));
    }

    return dates;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft (surveys) {
    const weeklyDuration = 48;
    const dailyDuration = 24;
    const weeklyPercentages = surveys.filter((survey) => {
        return moment(survey.endTime, sqlDateFormat)
        .diff(moment(survey.startTime, sqlDateFormat), 'hours') === weeklyDuration;
    })
    .map((survey) => {
        return calculateTimeLeft(
            moment(survey.startTime, sqlDateFormat),
            moment(survey.endTime, sqlDateFormat),
            moment(survey.actualSubmissionTime, sqlDateFormat)
        );
    });
    const dailyPercentages = surveys.filter((survey) => {
        return moment(survey.endTime, sqlDateFormat)
        .diff(moment(survey.startTime, sqlDateFormat), 'hours') === dailyDuration;
    })
    .map((survey) => {
        return calculateTimeLeft(
            moment(survey.startTime, sqlDateFormat),
            moment(survey.endTime, sqlDateFormat),
            moment(survey.actualSubmissionTime, sqlDateFormat)
        );
    });

    return [{
        label: '% Time left until weekly survey expired',
        backgroundColor: 'rgba(60, 103, 124, 0.2)',
        borderColor: 'rgba(60, 103, 124, 1)',
        pointBorderColor: 'rgba(60, 103, 124, 1)',
        data: weeklyPercentages
    },
    {
        label: '% Time left until daily survey expired',
        backgroundColor: 'rgba(247, 94, 24, 0.2)',
        borderColor: 'rgba(247, 94, 24, 1)',
        pointBorderColor: 'rgba(247, 94, 24, 1)',
        data: dailyPercentages
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
    const totalAvailibleTime = endTime.diff(openTime, 'hours');
    const timeTaken = endTime.diff(completedTime, 'hours');

    // caculate percent of time taken out of total time availible to take the survey
    const percentTimeLeft = Math.round(timeTaken / totalAvailibleTime * percent);

    // either take the amount of time left
    // or if the survey instance expired (negative percent) show zero time left
    return Math.max(percentTimeLeft, minTime);
}

module.exports = processSurveyInstances;
module.exports.pickDates = pickDates;
module.exports.pickTimeLeft = pickTimeLeft;
module.exports.calculateTimeLeft = calculateTimeLeft;
