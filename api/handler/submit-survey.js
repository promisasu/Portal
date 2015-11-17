/* eslint no-loop-func: 0, max-nested-callbacks: [2, 3]  */
'use strict';

const database = require('../../model');
const boom = require('boom');
const _ = require('lodash');
const moment = require('moment');

module.exports = function (request, reply) {
    const questionInstance = database.sequelize.model('question_instance');
    const surveyInstance = database.sequelize.model('survey_instance');
    const questionOption = database.sequelize.model('question_option');
    const surveyInstanceId = request.query.surveyInstanceID;
    const questionInstArr = [];

    let currentSurveyInstance;

    surveyInstance.find({
        where: {
            id: request.query.surveyInstanceID,
            surveyInstanceCompleted: false
        }
    })
    .then((survey) => {
        currentSurveyInstance = survey;
        return new Promise((resolve, reject) => {
            if (survey) {
                resolve();
            } else {
                reject('Either survey_instance does not exist or its already completed');
            }
        });
    })
    .then(() => {
        for (let index = 0; index < request.payload.surveyResults.length; index++) {
            const currentQuestion = request.payload.surveyResults[index];

            if (_.isNumber(currentQuestion.selectedOptions)) {
                questionInstArr.push(
                    questionInstance.create({
                        questionTemplateId: currentQuestion.quesID,
                        surveyInstanceId: surveyInstanceId,
                        questionOptionId: currentQuestion.selectedOptions[0]
                    })
                );
            } else {
                questionInstArr.push(
                    questionOption.find({
                        where: {
                            optionText: currentQuestion.bodyPain[0].location
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
                            optionText: currentQuestion.bodyPain[0].intensity
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
};
