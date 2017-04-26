'use strict';

/**
 * @module controller/helper/process-survey-instances
 */

const moment = require('moment');
const calculateScores = require('../helper/calculate-scores');

const sqlDateFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
const viewDateFormat = 'MM-DD-YYYY HH:mm';

/**
 * Takes in a Survey Instances and processes it to get Complience chart details
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} Complience chart data
 */
function processSurveyInstances (surveys) {
    // ////console.log('In process surbey instances');
    const filterSurveyByState = surveys.filter((survey) => {
        return survey.state === 'completed';
    });
    // //////console.log(filterSurveyByState);
    let datasets = pickTimeLeft(filterSurveyByState);
    let labels = [];

    for (let i = 0; i < datasets.length; i++) {
        let dataSet = datasets[i];
        let y = dataSet.data;
        let x = dataSet.dates;

        datasets[i].data = [];
        for (let j = 0; j < x.length; j++) {
            datasets[i].data.push({
                'x': x[j],
                'y': y[j]
            });
        }
        labels.push.apply(labels, dataSet.dates);
    }
    const numberOfDays = 1;
    const endDateforChart = moment(labels[labels.length - 1]).add(numberOfDays, 'day');

    labels.push(moment(endDateforChart).format(viewDateFormat));
    //console.log('------------- Labels -----------');
    //console.log(labels);

    // ////console.log('Scores Chart');
    for (var i = 0; i < datasets.length; i++) {
        // ////console.log(datasets[i].data);
    }

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
function pickDates (surveys) {
    const dates = surveys.map((survey) => {
        return moment(survey.StartTime).format(viewDateFormat);
    });

    if (surveys[0]) {
        // Adding an additional week to include all the dates in compliance chart.
        // This is done because chart js plots only the first day of the week.
        const numberOfDays = 1;
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
function pickTimeLeft (surveys) {
    let surveySet = new Set();

    for (let i = 0; i < surveys.length; i++) {
        surveySet.add(surveys[i].activityTitle);
    }
    let surveyTypes = [];

    for (let activityTitle of surveySet) {
        surveyTypes.push(surveys.filter((survey) => {
            return survey.activityTitle === activityTitle;
        }));
    }
    let returnArray = [];

    for (let i = 0; i < surveyTypes.length; i++) {
        if (surveyTypes[i].length > 0) {
            let samplePoint = surveyTypes[i][0];
            let dataPoints = surveyTypes[i].map((survey) => {
                return calculateTimeLeft(
                    moment(survey.StartTime),
                    moment(survey.EndTime),
                    moment(survey.ActualSubmissionTime)
                );
            });
            let dates = surveyTypes[i].map((survey) => {
                return moment(survey.StartTime).format(viewDateFormat);
            });
            let dataArr = {
                label: '% Time left until ' + samplePoint.activityTitle + ' expired',
                backgroundColor: getRGBA(),
                borderColor: getRGBA(),
                pointBorderColor: getRGBA(),
                pointBorderWidth: 5,
                pointRadius: 5,
                data: dataPoints,
                dates: dates
            };

            returnArray.push(dataArr);
        }
    }

    return returnArray;
}

/**
 * Generates and returns random colors
 * @returns {Object} processed list of datetimes
 */
function getRGBA () {
    let red = Math.floor(Math.random() * 255) + 1;
    let green = Math.floor(Math.random() * 255) + 1;
    let blue = Math.floor(Math.random() * 255) + 1;

    return 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',0.5)';
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

/**
 * Takes in a Survey Instances and processes to get opioid equivalence
 * @param {Array<Object>} surveys - list of survey instances
 * @param {Array<Object>} surveyDetails - list of survey instances
 * @param {Array<Object>} bodyPainResults - list of body pain questions answered
 * @returns {Array<Object>} data for the chart
 */
function processClinicanData (surveys, surveyDetails, bodyPainResults, opioidResults) {
    // //////console.log('In clinician data');
    let labels = surveys.map((survey) => {
        return moment(survey.StartTime).format(viewDateFormat);
    });
    const numberOfDays = 1;
    const endDateforChart = moment(labels[labels.length - 1]).add(numberOfDays, 'day');

    labels.push(moment(endDateforChart).format(viewDateFormat));

    let datasets = pickClinicianDataset(surveys, surveyDetails, bodyPainResults, opioidResults, labels);

    // //////console.log(datasets);

    return {
        labels: labels,
        datasets: datasets
    };
}
let darkPink = 'rgba(250, 29, 150,1)';
let pink = 'rgba(254, 160,172, 1)';
let green = 'rgba(122, 198,150, 1)';
let yellow = 'rgba(182, 29,57, 1)';
let blue = 'rgba(2, 117,216, 0.6)';
let white = 'rgba(255,255,255, 0.9)';
let darkBrown = 'rgba(101,56,33, 1)';
let gray = 'rgba(76,76,76, 1)';
let violet = 'rgba(119,65,119, 1)';

/**
 * Takes in a Survey Instances and processes to get opioid equivalence
 * @param {Array<Object>} surveys - list of survey instances
 * @param {Array<Object>} surveyDetails - list of survey instances
 * @param {Array<Object>} bodyPainResults - list of body pain answers
 * @returns {Array<Object>} data for the chart
 */
function pickClinicianDataset (surveys, surveyDetails, bodyPainResults, opioidResults, labels) {
    let dataPoints = [];
    let datasets = [];
    dataPoints.push({
        label: 'PR Anxiety',
        data: getPRAnxietyScore(surveyDetails, labels)[0],
        color: darkPink,
        conversionFactor:getPRAnxietyScore(surveyDetails, labels)[1]
    });
    //console.log("Here");
    dataPoints.push({
        label: 'PR Physical',
        data: getPRPhysicalFunc(surveyDetails, labels)[0],
        color: darkBrown,
        conversionFactor:getPRPhysicalFunc(surveyDetails, labels)[1]
    });
    //console.log("Here");
    dataPoints.push({
        label: 'PR Fatigue',
        data: getPRFatigue(surveyDetails, labels)[0],
        color: gray,
        conversionFactor:getPRFatigue(surveyDetails, labels)[1]
    });
    //console.log("Here");
    dataPoints.push({
        label: 'PR Pain Intensity',
        data: getPRPainIntensity(surveyDetails, labels)[0],
        color: violet,
        conversionFactor:getPRPainIntensity(surveyDetails, labels)[1]
    });
    //console.log("Here");
    dataPoints.push({
        label: 'Opoid Equivalance',
        data: getOpoidEquivivalance(opioidResults, labels)[0],
        color: pink,
        conversionFactor:getOpoidEquivivalance(opioidResults, labels)[1]
    });
    dataPoints.push({
        label: 'Pain Intensity',
        data: getPainIntensity(bodyPainResults, labels)[0],
        color: yellow,
        conversionFactor:getPainIntensity(bodyPainResults, labels)[1]
    });
    //console.log('Here1');
    dataPoints.push({
        label: 'Opoid Threshold',
        data: getOpioidThreshold(opioidResults)[0],
        color: blue,
        conversionFactor:getOpioidThreshold(opioidResults)[1]
    });
    //console.log('Here1');
    //console.log('GOnna return Datasets');
    for (let i = 0; i < dataPoints.length; i++) {
        datasets.push({
            label: dataPoints[i].label,
            fill: false,
            backgroundColor: dataPoints[i].color,
            borderColor: dataPoints[i].color,
            pointBorderColor: dataPoints[i].color,
            pointBackgroundColor: white,
            pointBorderWidth: 5,
            pointRadius: 5,
            data: dataPoints[i].data,
            conversionFactor: dataPoints[i].conversionFactor,
            spanGaps: true
        });
        if (dataPoints[i].label === 'Opoid Threshold') {
            datasets[i].borderDash = [10, 5];
            datasets[i].pointBorderWidth = 0;
            datasets[i].radius = 0;
            delete datasets[i].pointBorderColor;
            delete datasets[i].pointBackgroundColor;
            delete datasets[i].pointBorderWidth;
            delete datasets[i].pointRadius;
        }
    }
    console.log(datasets);
    return datasets;
}


/**
 * Takes in a Survey Instances and processes to get opioid equivalence
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Array<Object>} data for the chart
 */
function getOpoidEquivivalance (opioidResults, labels) {
    return [createMultiLinePoints(calculateScores.opioidResultsCalculation(opioidResults)[0], labels),calculateScores.opioidResultsCalculation(opioidResults)[1]];
}

/**
 * Takes in a Survey Instances and processes to get PROMIS score
 * @param {Array<Object>} surveyDetails - list of survey instances
 * @returns {Array<Object>} data for the chart
 */
function getPromisScore (surveyDetails, labels) {
    let promisScores = calculateScores.calculatePromisScores(surveyDetails);
    return createMultiLinePoints(promisScores, labels);
}

function getPRPainIntensity (surveyDetails, labels) {
    let promisScores = calculateScores.calculatePR_PainInt(surveyDetails);
    return [createMultiLinePoints(promisScores[0], labels, promisScores[1]),promisScores[1]] ;
}

function getPRAnxietyScore (surveyDetails, labels) {
    let promisScores = calculateScores.calculatePR_Anxiety(surveyDetails);
    return [createMultiLinePoints(promisScores[0], labels, promisScores[1]),promisScores[1]];
}

function getPRPhysicalFunc (surveyDetails, labels) {
    let promisScores = calculateScores.calculatePR_PhyFuncMob(surveyDetails);
    return [createMultiLinePoints(promisScores[0], labels, promisScores[1]),promisScores[1]];
}

function getPRFatigue (surveyDetails, labels) {
    let promisScores = calculateScores.calculatePR_Fatigue(surveyDetails);
    return [createMultiLinePoints(promisScores[0], labels, promisScores[1]),promisScores[1]];
}

/**
 * Takes in a Survey Instances and processes to get opioid threshold
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Array<Object>} data for the chart
 */
function getOpioidThreshold (opioidResults) {
    return calculateScores.opioidThresholdCalculation(opioidResults);
}

/**
 * Takes in set of body pain answers and processes to get pain intensity
 * @param {Array<Object>} bodyPainResults - list of body pain answers
 * @returns {Array<Object>} data for the chart
 */
function getPainIntensity (bodyPainResults, labels) {
    let singleBodyPainAnswer = {};
    let instanceId = '';
    let resultSet = [];

    bodyPainResults.forEach((result) => {
        // //////console.log(result);
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            patientType: result.patientType
        };

        if (typeof singleBodyPainAnswer[result.id] === 'undefined') {
            singleBodyPainAnswer[result.id] = [temp];
        } else {
            singleBodyPainAnswer[result.id].push(temp);
        }
    });
    for (let activityInstanceId in singleBodyPainAnswer) {
        if (singleBodyPainAnswer.hasOwnProperty(activityInstanceId)) {
            let result = {
                x: '',
                y: 0
            };
            let bodyPainScore = 0;
            let date = new Date();

            singleBodyPainAnswer[activityInstanceId].forEach((answer) => {
                date = moment(answer.StartTime).format(viewDateFormat);
                if (isInt(answer.optionText)) {
                    bodyPainScore = parseInt(answer.optionText);
                }
            });
            result.x = date;
            result.y = bodyPainScore;
            resultSet.push(result);
        }
    }
    let max = 0;
    let data = resultSet;
    for (var i = 0; i < data.length; i++) {
        if (data[i].y !== null && max < data[i].y) {
            max = data[i].y;
        }
    }
    ////console.log("MAX");
    //console.log(max);
    return [createMultiLinePoints(resultSet, labels),max/100];
    // return resultSet;
}

function createMultiLinePoints (data, labels, conversionFactor = -1) {
    // //console.log("Create MultiLine Points conversionFactor");
    // //console.log(conversionFactor);
    // //console.log("Data");
    // //console.log(data);
    // //////console.log(labels);
    let returnData = [];
    var j = 0;
    for (var i = 0; i < labels.length; i++) {
        if (data[j] && labels[i] == data[j].x && j > -1) {
            returnData.push(data[j].y);
            if (j == data.length) {
                j = -1;
            } else {
                j += 1;
            }
        } else {
            returnData.push(null);
        }
    }
    // ////console.log('------------------Return data -----------------');
    // ////console.log(returnData);
    // ////console.log('-----------------------------------');

    return normalizeValues(returnData, conversionFactor);
}

function normalizeValues (data, conversionFactor = -1) {
  // ////console.log("In normalize values");
    let max = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i] !== null && max < data[i]) {
            max = data[i];
        }
    }
    // ////console.log("reached here");
    let newConversionFactor = conversionFactor;
    if (conversionFactor == -1) {
        newConversionFactor = 100 / max;
    }
    // ////console.log("reached here");
    for (var i = 0; i < data.length; i++) {
        if (data[i] !== null) {
            data[i] = data[i] * newConversionFactor;
        }
    }
    // ////console.log('------------------data -----------------');
    // ////console.log(data);
    // ////console.log('-----------------------------------');

    return data;
}

/**
 * Takes in a Survey Instances and processes to compute PROMIS score
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Array<Object>} data for the chart
 */
function calculatePromisScore (surveys) {
    // Filter out the surveys that you are going to process, eg, Daily or weekly endDateforChart
    // Calculate the promis score for each surveys
    // Calculate the labels for your filtered surveys.
    // let dates = surveys.map((survey) => {
    //     return moment(survey.StartTime).format(viewDateFormat);
    // });
    // Return data like so [{x:<label>,y:<value>},{x:<label>,y:<value>}]
}

/**
 * Takes in a value and checks whether the value is an integer
 * @param {Integer} value - to be checked for integer
 * @returns {Boolean} return true if the number is an integer or false otherwise
 */
function isInt (value) {
    return !isNaN(value) && ((x) => {
        return (x | 0) === x;
    })(parseFloat(value));
}

module.exports = processSurveyInstances;
module.exports.pickDates = pickDates;
module.exports.pickTimeLeft = pickTimeLeft;
module.exports.calculateTimeLeft = calculateTimeLeft;
module.exports.processClinicanData = processClinicanData;
