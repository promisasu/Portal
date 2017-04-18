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
function processSurveyInstances(surveys) {
    const filterSurveyByState = surveys.filter((survey) => {
        return survey.state === 'completed';
    });
    // const filterSurveyByState = surveys;
    console.log("process survey instances");
    var datasets = pickTimeLeft(filterSurveyByState);
    console.log(datasets);
    var labels = [];
    for (var i = 0; i < datasets.length; i++) {
        var dataSet = datasets[i];
        var y = dataSet.data;
        var x = dataSet.dates;
        datasets[i].data = [];
        for (var j = 0; j < x.length; j++) {
            datasets[i].data.push({
                'x': x[j],
                'y': y[j]
            });
        }
        labels.push.apply(labels, dataSet.dates);
    }
    const numberOfDays = 7;
    const endDateforChart = moment(labels[labels.length - 1]).add(numberOfDays, 'day');
    labels.push(moment(endDateforChart).format(viewDateFormat));
    return {
        labels: labels,
        datasets: datasets
    };
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Object} surveys - list of survey instances
 * @returns {Object} processed list of datetimes
 */
function pickDates(surveys) {
    const dates = surveys.map((survey) => {
        return moment(survey.StartTime).format(viewDateFormat);
    });

    if (surveys[0]) {
        // Adding an additional week to include all the dates in compliance chart.
        // This is done because chart js plots only the first day of the week.
        const numberOfDays = 7;
        const endDateforChart = moment(surveys[surveys.length - 1].EndTime).add(numberOfDays, 'day');

        dates.push(moment(endDateforChart).format(viewDateFormat));
    }

    return dates;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft(surveys) {
    var surveySet = new Set();
    for (var i = 0; i < surveys.length; i++) {
        surveySet.add(surveys[i].activityTitle);
    }
    var surveyTypes = [];
    for (let activityTitle of surveySet) {
        surveyTypes.push(surveys.filter((survey) => {
            return survey.activityTitle === activityTitle
        }));
    }
    var returnArray = [];
    for (var i = 0; i < surveyTypes.length; i++) {
      if (surveyTypes[i].length>0) {
        var samplePoint = surveyTypes[i][0];
        var dataPoints = surveyTypes[i].map((survey) => {
            return calculateTimeLeft(
                moment(survey.StartTime),
                moment(survey.EndTime),
                moment(survey.ActualSubmissionTime)
            )
        });
        var dates = surveyTypes[i].map((survey) => {
            return moment(survey.StartTime).format(viewDateFormat);
        });
        var dataArr = {
            label: '% Time left until '+ samplePoint.activityTitle + ' expired',
            backgroundColor: getRGBA(),
            borderColor: getRGBA(),
            pointBorderColor: getRGBA(),
            pointBorderWidth: 10,
            pointRadius: 10,
            data: dataPoints,
            dates: dates
        // if (surveyTypes[i].length > 0) {
        //     var samplePoint = surveyTypes[i][0];
        //     var dataPoints = surveyTypes[i].map((survey) => {
        //         return calculateTimeLeft(
        //             moment(survey.StartTime),
        //             moment(survey.EndTime),
        //             moment(survey.ActualSubmissionTime)
        //         )
        //     });
        //     var dates = surveyTypes[i].map((survey) => {
        //         return moment(survey.StartTime).format(viewDateFormat);
        //     });
        //     var dataArr = {
        //         label: '% Time left until ' + samplePoint.activityTitle + ' expired',
        //         backgroundColor: getRGBA(),
        //         borderColor: getRGBA(),
        //         pointBorderColor: getRGBA(),
        //         data: dataPoints,
        //         dates: dates
        //     }
        //     returnArray.push(dataArr);
// >>>>>>> origin/US#122
        }
    }
    return returnArray;
}
}

function getRGBA() {
    var red = Math.floor(Math.random() * 255) + 1;
    var green = Math.floor(Math.random() * 255) + 1;
    var blue = Math.floor(Math.random() * 255) + 1;
    return 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',0.5)'
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Moment} openTime - When survey instance became availible
 * @param {Moment} endTime - When the survey instance is no longer availible to be taken
 * @param {Moment} completedTime - When the survey instance was actually completed
 * @returns {Number} percent time left after completing survey instance
 */
function calculateTimeLeft(openTime, endTime, completedTime) {
    const percent = 100;
    const minTime = 0;

    // calculate the time in hours until end time
    const totalAvailibleTime = endTime.diff(openTime, 'hours');
    let percentTimeLeft = minTime;

    if (completedTime !== null && !isNaN(completedTime)) {
        const timeTaken = endTime.diff(completedTime, 'hours');

        // caculate percent of time taken out of total time availible to take the survey
        percentTimeLeft = Math.round(timeTaken / totalAvailibleTime * percent);
    }

    // either take the amount of time left
    // or if the survey instance expired (negative percent) show zero time left
    return Math.max(percentTimeLeft, minTime);
}

function processClinicanData(surveys){
  console.log("In clinician data");
  var datasets = pickClinicianDataset(surveys);
  console.log(datasets);
  var labels = surveys.map((survey) => {
      return moment(survey.StartTime).format(viewDateFormat);
  });
  const numberOfDays = 7;
  const endDateforChart = moment(labels[labels.length - 1]).add(numberOfDays, 'day');
  labels.push(moment(endDateforChart).format(viewDateFormat));
  return {
      labels:labels,
      datasets: datasets
  };
}

var pink = "rgba(254, 160,172, 1)";
var green = "rgba(122, 198,150, 1)";
var yellow = "rgba(182, 29,57, 1)";
var blue = "rgba(2, 117,216, 0.6)";
var white = "rgba(255,255,255, 0.9)";

function pickClinicianDataset(surveys){
  var dataPoints = [];
  var datasets = [];
  dataPoints.push({label: 'Opoid Equivalance',data:getOpoidEquivivalance(surveys),color:pink});
  dataPoints.push({label: 'Promis Score',data:getPromisScore(surveys),color:green});
  dataPoints.push({label: 'Pain Intensity',data:getPainIntensity(surveys),color:yellow});
  dataPoints.push({label: 'Opoid Threshold',data:getOpioidThreshold(surveys),color:blue});
  for (var i = 0; i < dataPoints.length; i++) {
    datasets.push({
                    label: dataPoints[i].label,
                    fill:false,
                    backgroundColor: dataPoints[i].color,
                    borderColor: dataPoints[i].color,
                    pointBorderColor: dataPoints[i].color,
                    pointBackgroundColor: white,
                    pointBorderWidth: 10,
                    pointRadius: 10,
                    data: dataPoints[i].data,
                });
    if (dataPoints[i].label == 'Opoid Threshold') {
      datasets[i].borderDash = [10,5];
    }
    }
  return datasets;
}

function getOpoidEquivivalance(surveys){
  var data = [];
  var labels = surveys.map((survey) => {
      return moment(survey.StartTime).format(viewDateFormat);
  });
  for (var i = 0; i < labels.length; i++) {
    data.push({x:labels[i],y:i*2});
  }
  return data;
}

function getPromisScore(surveys){
  var data = [];
  var labels = surveys.map((survey) => {
      return moment(survey.StartTime).format(viewDateFormat);
  });
  for (var i = 0; i < labels.length; i++) {
    data.push({x:labels[i],y:i*4});
  }
  return data;
}

function getOpioidThreshold(surveys){
  var data = [];
  var labels = surveys.map((survey) => {
      return moment(survey.StartTime).format(viewDateFormat);
  });
  for (var i = 0; i < labels.length; i++) {
    data.push({x:labels[i],y:50});
  }
  return data;
}

function getPainIntensity(surveys){
  var data = [];
  var labels = surveys.map((survey) => {
      return moment(survey.StartTime).format(viewDateFormat);
  });
  for (var i = 0; i < labels.length; i++) {
    data.push({x:labels[i],y:i*3});
  }
  return data;
}

function calculatePromisScore(surveys){
  //Filter out the surveys that you are going to process, eg, Daily or weekly endDateforChart
  // Calculate the promis score for each surveys
  // Calculate the labels for your filtered surveys.
  // var dates = surveys.map((survey) => {
  //     return moment(survey.StartTime).format(viewDateFormat);
  // });
  // Return data like so [{x:<label>,y:<value>},{x:<label>,y:<value>}]
}

module.exports = processSurveyInstances;
module.exports.pickDates = pickDates;
module.exports.pickTimeLeft = pickTimeLeft;
module.exports.calculateTimeLeft = calculateTimeLeft;
module.exports.processClinicanData = processClinicanData;
