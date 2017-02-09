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
  console.log("In process Survey Instances");
  // console.log(surveys);
    const filterSurveyByState = surveys.filter((survey) => {
        return survey.State === 'completed' || survey.State === 'pending';
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
        return moment(survey.StartTime).format(viewDateFormat);
    });

    if (surveys[0]) {
        // Adding an additional week to include all the dates in compliance chart.
        // This is done because chart js plots only the first day of the week.
        const numberOfDays = 7;
        const endDateforChart = moment(surveys[surveys.length -1].EndTime).add(numberOfDays, 'day');

        dates.push(moment(endDateforChart).format(viewDateFormat));
    }

    console.log("Dates");
    console.log(dates);
    return dates;
}

/**
 * Takes in a Survey Instances and get the % time left to be shown on complience chart
 * @param {Array<Object>} surveys - list of survey instances
 * @returns {Object} processed list of % time left data
 */
function pickTimeLeft (surveys) {
    const weeklyDuration = 24;
    const dailyDuration = 24;
    // console.log("Moment Diff");
    // console.log(moment(surveys[0].EndTime)
    // .diff(moment(surveys[0].StartTime), 'hours'));
    const weeklyPercentages = surveys.filter((survey) => {
        return moment(survey.EndTime)
        .diff(moment(survey.StartTime), 'hours') > weeklyDuration;
    })
    .map((survey) => {
        return calculateTimeLeft(
            moment(survey.StartTime),
            moment(survey.EndTime),
            moment(survey.ActualSubmissionTime)
        );
    });
    const dailyPercentages = surveys.filter((survey) => {
        return moment(survey.EndTime)
        .diff(moment(survey.StartTime), 'hours') <= dailyDuration;
    })
    .map((survey) => {
        return calculateTimeLeft(
            moment(survey.StartTime),
            moment(survey.EndTime),
            moment(survey.ActualSubmissionTime)
        );
    });
    // console.log("weeklyPercentages");
    // console.log(weeklyPercentages);
    // console.log("Daily");
    // console.log(dailyPercentages);
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

module.exports = processSurveyInstances;
module.exports.pickDates = pickDates;
module.exports.pickTimeLeft = pickTimeLeft;
module.exports.calculateTimeLeft = calculateTimeLeft;
