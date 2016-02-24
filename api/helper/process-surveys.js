'use strict';

/**
 * @module api/helper/process-surveys
 */

const moment = require('moment');

/**
 * Takes in a survey_instance model and processes it into a format recognized by app.
 * @param {Object} surveys - list of objects of survey_instance
 * @returns {Object} processed list of surveys in an array
 */
function processSurveys (surveys) {
    return {
        surveyTitle: surveys.name,
        surveyInstanceID: surveys.id,
        nextDueAt: surveys.startTime,
        okayToStart: moment() < surveys.endTime && moment() > surveys.startTime
    };
}

module.exports = processSurveys;
