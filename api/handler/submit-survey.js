'use strict';

/**
 * @module api/handler/submit-survey
 */

const database = require('../../model');
const boom = require('boom');
const moment = require('moment');
const first = 0;

/**
 * Fills in answered QuestionInstances for a submitted SurveyInstance
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function submitSurvey (request, reply) {
    const questionInstance = database.sequelize.model('question_instance');
    const surveyInstance = database.sequelize.model('survey_instance');
    const questionOption = database.sequelize.model('question_option');
    const surveyInstanceId = request.payload.surveyInstanceID;
    const questionInstArr = [];

    let currentSurveyInstance = null;

    surveyInstance.find({
        where: {
            id: request.payload.surveyInstanceID,
            surveyInstanceCompleted: false
        }
    })
    .then((survey) => {
        return new Promise((resolve, reject) => {
            if (survey) {
                if (moment() > survey.endTime) {
                    reject('Error - Survey has expired');
                } else {
                    currentSurveyInstance = survey;
                    resolve();
                }
            } else {
                reject('Either survey_instance does not exist or its already completed');
            }
        });
    })
    .then(() => {
        for (let index = 0; index < request.payload.surveyResults.length; index += 1) {
            const currentQuestion = request.payload.surveyResults[index];

            if (
                currentQuestion
                && currentQuestion.bodyPain
                && currentQuestion.bodyPain[first]
                && currentQuestion.bodyPain[first].location
            ) {
                questionInstArr.push(
                    questionOption.find({
                        where: {
                            optionText: currentQuestion.bodyPain[first].location
                        }
                    })
                    .then((data) => {
                        return questionInstance.create({
                            questionTemplateId: currentQuestion.quesID,
                            surveyInstanceId: surveyInstanceId,
                            questionOptionId: data.id
                        });
                    })
                );
                questionInstArr.push(
                    questionOption.find({
                        where: {
                            optionText: currentQuestion.bodyPain[first].intensity
                        }
                    })
                    .then((data) => {
                        return questionInstance.create({
                            questionTemplateId: currentQuestion.quesID,
                            surveyInstanceId: surveyInstanceId,
                            questionOptionId: data.id
                        });
                    })
                );
            } else {
                questionInstArr.push(
                   questionInstance.create({
                       questionTemplateId: currentQuestion.quesID,
                       surveyInstanceId: surveyInstanceId,
                       questionOptionId: currentQuestion.selectedOptions[first]
                   })
                );
            }
        }
        return Promise.all(questionInstArr);
    })
    .then(() => {
        currentSurveyInstance.userSubmissionTime = request.payload.timeStamp;
        currentSurveyInstance.actualSubmissionTime = moment();
        currentSurveyInstance.surveyInstanceCompleted = true;
        currentSurveyInstance.save();
        reply({
            statusCode: 500,
            message: 'Success'
        });
    })
    .catch((err) => {
        reply(boom.badRequest(err));
    });
}

module.exports = submitSurvey;
