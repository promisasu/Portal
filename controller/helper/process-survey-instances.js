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

 var dates = new Array();
 dates[0]= '01/01/2015 20:00';
 dates[1]= '01/02/2015 21:00';
 dates[2]= '01/03/2015 22:00';
 dates[3]= '01/04/2015 23:00';
 dates[4]= '01/05/2015 03:00';
 dates[5]= '01/06/2015 10:00';
 dates[6]= '01/07/2015 04:00';
  return dates;
}

function calculateTimeLeft(surveys) {

  var fakeData = Array();
  fakeData[0]= 100;
  fakeData[1]= 70;
  fakeData[2]= 75;
  fakeData[3]= 0;
  fakeData[4]= 40;
  fakeData[5]= 50;
  fakeData[6]= 0;

  var calData = [{label:'% Time left until daily survey expired',
                  data: fakeData}];
  return calData;

}
module.exports = processSurveyInstances;
