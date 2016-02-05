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
        labels: pickupSubmissionTime(surveys),
        datasets: pickTimeLeft(surveys)
    };
}

/**
 * Takes in a Survey Instances and get the dates to be shown on Complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} list of dates labels
 */
function pickupSubmissionTime (surveys) {
    const dates = [];

    for (let index = 0; index < surveys.length; index += 1) {
        // dates[index] = formatDate(surveys[index].startTime);
        dates[index] = moment(surveys[index].startTime).format('MM/DD/YYYY HH:mm');
    }
    return dates;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft (surveys) {
    const percentages = [];

    for (let index = 0; index < surveys.length; index += 1) {
        percentages[index] = calculateTimeLeft(moment(surveys[index].startTime),
                                                moment(surveys[index].endTime),
                                                moment(surveys[index].actualSubmissionTime));
    }
    const calData = [{label: '% Time left until daily survey expired',
                    data: percentages}];

    return calData;
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
    console.log(percentTimeLeft);
    return Math.round(percentTimeLeft * percent);
}
module.exports = processSurveyInstances;
