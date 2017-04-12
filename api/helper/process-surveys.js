'use strict';

/**
 * @module api/helper/process-surveys
 */

/**
 * Takes in a survey_instance model and processes it into a format recognized by app.
 * @param {Object} surveys - list of objects of survey_instance
 * @param {Date} now - current time
 * @returns {Object} processed list of surveys in an array
 */
function processSurveys (surveys, now = new Date()) {
    return {
        surveyTitle: surveys.name,
        surveyInstanceID: surveys.id,
        nextDueAt: surveys.startTime,
        okayToStart: now < surveys.endTime && now > surveys.startTime
    };
}

module.exports = processSurveys;
