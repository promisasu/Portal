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
        // Using UTC as the date gets modified to the local time (GMT in this case) when UTC not used.
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
        return moment(survey.startTime, sqlDateFormat).utc().format(viewDateFormat);
    });

    if (surveys[0]) {
        dates.push(moment(surveys[0].dateCompleted, sqlDateFormat).utc().format(viewDateFormat));
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
    const percentages = surveys.map((survey) => {
        return calculateTimeLeft(
            moment(survey.startTime, sqlDateFormat).utc().format(viewDateFormat),
            moment(survey.endTime, sqlDateFormat).utc().format(viewDateFormat),
            moment(survey.actualSubmissionTime, sqlDateFormat).utc().format(viewDateFormat)
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
    const totalAvailibleTime = moment(openTime, viewDateFormat).diff(moment(endTime, viewDateFormat), 'hours');
    const timeTaken = moment(completedTime, viewDateFormat).diff(moment(endTime, viewDateFormat), 'hours');

    // caculate percent of time taken out of total time availible to take the survey
    const percentTimeLeft = Math.round(timeTaken / totalAvailibleTime * percent);

    // either take the amount of time left
    // or if the survey instance expired (negative percent) show zero time left
    return Math.max(percentTimeLeft, minTime);
}

module.exports = processSurveyInstances;
