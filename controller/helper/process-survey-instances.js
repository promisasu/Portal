'use strict';

/**
 * @module controller/helper/process-survey-instances
 */

/**
 * Takes in a Survey Instances and processes it to get complence chart details
 * @param {Surveys} list of survey instances
 * @returns {Object}  Complience chart data
 */
function processSurveyInstances (surveys) {
    return {
      labels:pickupSubmissionTime(surveys),
      datasets:calculateTimeLeft(surveys)
    };
}

function pickupSubmissionTime(surveys) {
  var dates = [];
  dates.length = surveys.length;
  for (var i = 0; i < surveys.length; i++) {
    dates[i] = formatDate(surveys[i].startTime);
  }
  return dates;
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function calculateTimeLeft(surveys) {
  var percentages = [];
  percentages.length = surveys.length;
/*
  for (var i = 0; i < surveys.length; i++) {
    var startTimeStamp = (Date.parse(surveys[i].startTime))/3600000;
    var endTimeStamp = (Date.parse(surveys[i].endTime))/3600000;
    var actualTimeStamp = (Date.parse(surveys[i].actualSubmissionTime)/3600000;
    var timeToCompleteSurvey = endTimeStamp - startTimeStamp;
    var timeTaken = endTimeStamp - actualTimeStamp;
    if (timeTaken = +integer) {
      percentages[i] = (timeTaken/timeToCompleteSurvey)*100;
    }
    else {
      percentages[i] = 0;
    }
  }
  console.log(percentages);
  */
  var calData = [{label:'% Time left until daily survey expired',
                  data: percentages}];
  return calData;

}
module.exports = processSurveyInstances;
