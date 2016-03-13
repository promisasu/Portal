'use strict';

/**
 * @module api/handler/submit-survey
 */

const database = require('../../model');
const boom = require('boom');

/**
 * Fills in answered QuestionInstances for a submitted SurveyInstance
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function surveyLogger (request, reply) {
    const surveyResponseLogger = database.sequelize.model('survey_response_logger');
    const surveyInstance = database.sequelize.model('survey_instance');
    const surveyInstanceId = request.payload.surveyInstanceID;
    const loggerArr = [];

    let transaction = null;

    database
    .sequelize
    .transaction()
    .then((newTransaction) => {
        transaction = newTransaction;

        return surveyInstance.find(
            {
                where: {
                    id: request.payload.surveyInstanceID
                },
                transaction
            }
        );
    })
    .then((survey) => {
        if (survey) {
            return null;
        }
        throw new Error('Survey instance does not exist in the system');
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
                ));
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

module.exports = surveyLogger;
