'use strict';

/**
 * @module api/handler/survey-results-logger
 */

const database = require('../../model');
const boom = require('boom');
const processLoggerResults = require('../helper/process-logger-results');

/**
 * Fills in all the in-app events along with metaData and timestamps.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function surveyResultsLogger (request, reply) {
    const loggerResults = request.payload.loggerResults;
    const logs = loggerResults.map(processLoggerResults);

    database
    .sequelize
    .model('survey_logger')
    .bulkCreate(logs)
    .then(() => {
        return reply({
            message: 'Success'
        });
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest(err));
    });
}

module.exports = surveyResultsLogger;
