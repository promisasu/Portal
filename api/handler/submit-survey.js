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
function submitSurvey (request, reply) {
    const questionResult = database.sequelize.model('question_result');
    const surveyInstance = database.sequelize.model('survey_instance');
    const questionOption = database.sequelize.model('question_option');
    const surveyInstanceId = request.payload.surveyInstanceID;
    const questionInstArr = [];

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
                    state: 'in progress'
                },
                transaction
            }
        );
    })
    .then((survey) => {
        if (!survey) {
            throw new Error('Either survey_instance does not exist or its already completed');
        }
        if (moment() > survey.endTime) {
            throw new Error('Error - Survey has expired');
        }
        currentSurveyInstance = survey;

        return null;
    })
    .then(() => {
        for (const currentQuestion of request.payload.surveyResults) {
            if (
                currentQuestion
                && currentQuestion.bodyPain
                && currentQuestion.bodyPain[0]
                && currentQuestion.bodyPain[0].location
            ) {
                questionInstArr.push(
                    questionOption.find(
                        {
                            where: {
                                optionText: currentQuestion.bodyPain[0].location
                            },
                            transaction
                        }
                    )
                    .then((data) => {
                        return questionResult.create(
                            {
                                surveyInstanceId,
                                questionOptionId: data.id
                            },
                            {transaction}
                        );
                    })
                );
                questionInstArr.push(
                    questionOption.find(
                        {
                            where: {
                                optionText: currentQuestion.bodyPain[0].intensity.toString()
                            },
                            transaction
                        }
                    )
                    .then((data) => {
                        return questionResult.create(
                            {
                                surveyInstanceId,
                                questionOptionId: data.id
                            },
                            {transaction}
                        );
                    })
                );
            } else {
                questionInstArr.push(
                   questionResult.create(
                       {
                           surveyInstanceId,
                           questionOptionId: currentQuestion.selectedOptions[0]
                       },
                       {transaction}
                   )
                );
            }
        }

        return Promise.all(questionInstArr);
    })
    .then(() => {
        currentSurveyInstance.userSubmissionTime = request.payload.timeStamp;
        currentSurveyInstance.actualSubmissionTime = moment();
        currentSurveyInstance.state = 'completed';

        return currentSurveyInstance.save({transaction});
    })
    .then(() => {
        return transaction.commit();
    })
    .then(() => {
        return reply({
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

module.exports = submitSurvey;
