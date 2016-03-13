'use strict';

/**
 * @module api/handler/submit-survey
 */

const database = require('../../model');
const boom = require('boom');
const moment = require('moment');

/**
 * Fills in answered QuestionInstances for a submitted SurveyInstance
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function responseLogger (request, reply) {
    const surveyResponseLogger = database.sequelize.model('survey-response-logger');
    const surveyInstance = database.sequelize.model('survey_instance');
    const surveyInstanceId = request.payload.surveyInstanceID;
    const loggerArr = [];

    let currentSurveyInstance = null;
    let transaction = null;

    database
    .sequelize
    .transaction()
    .then((newTransaction) => {
        transaction = newTransaction;

        return surveyInstance.find(
            {
                where: {
                    id: request.payload.surveyInstanceID,
                },
                transaction
            }
        );
    })
    .then((survey) => {
        if (survey) {
            currentSurveyInstance = survey;
            return null;
        } else {
            throw new Error('Survey instance does not exist in the system');
        }
    })
    .then(() => {
        for (const currentQuestion of request.payload.surveyResponseLog) {
            loggerArr.push(
                surveyResponseLogger.create(
                    {
                        surveyInstanceId,
                        questionTemplateId: currentQuestion.quesID,
                        ansTimestamp: currentQuestion.ansTimestamp,
                        prevTimeStamp: currentQuestion.prevTimeStamp,
                        nextTimeStamp: currentQuestion.nextTimeStamp
                    },
                    {transaction}
                );
            )
        }
        return Promise.all(loggerArr);
    })
    .then(() => {
        return transaction.commit();
    })
    .then(() => {
        reply({
            statusCode: 500,
            message: 'Success'
        });
    })
    .catch((err) => {
        transaction.rollback();
        console.error(err);
        reply(boom.badRequest(err));
    });
}

module.exports = responseLogger;
