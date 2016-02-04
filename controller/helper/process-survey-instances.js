'use strict';

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
        datasets: calculateTimeLeft(surveys)
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
      dates[index] = formatDate(surveys[index].startTime);
    }
    return dates;
}

/**
 * Takes in a date as per DB format and process it to complience chart format
 * @param {Object} date - DB formatted Date
 * @returns {Object} formatted date
 */
function formatDate (date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function calculateTimeLeft (surveys) {
    const percentages = [];

    for (let index = 0; index < surveys.length; index += 1) {
      let startTimeStamp = (Date.parse(surveys[index].startTime))/3600000;
      let endTimeStamp = (Date.parse(surveys[index].endTime))/3600000;
      let actualTimeStamp = (Date.parse(surveys[index].actualSubmissionTime))/3600000;
      let timeToCompleteSurvey = endTimeStamp - startTimeStamp;
      let timeTaken = endTimeStamp - actualTimeStamp;
      if (timeTaken > 0) {
        percentages[index] = Math.round((timeTaken/timeToCompleteSurvey)*100);
      }
      else {
        percentages[index] = 0;
      }
    }

    const calData = [{label:'% Time left until daily survey expired',
                    data: percentages}];
    return calData;

}
module.exports = processSurveyInstances;
