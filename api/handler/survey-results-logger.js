'use strict';

/**
 * @module api/handler/submit-survey
 */

// const database = require('../../model');
// const boom = require('boom');

/**
 * Fills in answered QuestionInstances for a submitted SurveyInstance
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function submitSurvey (request, reply) {
    // const surveyLogger = database.sequelize.model('survey_logger');
    console.log('Inside Survey Logger API');
    reply();
}

module.exports = submitSurvey;
