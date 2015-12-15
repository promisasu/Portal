'use strict';

/**
 * @module api/handler/get-survey
 */

const database = require('../../model');
const processSurveyInstance = require('../helper/process-survey-instance');
const _ = require('lodash');
const boom = require('boom');
const moment = require('moment');

/**
 * Gets all of the QuestionTemplates and QuestionOptions for a SurveyTemplate
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function getSurvey (request, reply) {
    const surveyInstance = database.sequelize.model('survey_instance');
    let currentSurveyInstance = null;

    surveyInstance.find({
        where: {
            id: request.query.surveyInstanceID
        }
    }).then((resultSurveyInstance) => {
        return new Promise((resolve, reject) => {
            if (resultSurveyInstance) {
                if (moment() < resultSurveyInstance.startTime) {
                    reject('Survey instance is not active');
                } else if (moment() > resultSurveyInstance.endTime) {
                    reject('Survey instance has expired');
                } else if (resultSurveyInstance.surveyInstanceCompleted) {
                    reject('Survey instance has been completed');
                } else {
                    currentSurveyInstance = resultSurveyInstance;
                    resolve();
                }
            } else {
                reject('Invalid survey instance ID');
            }
        })
        .then(() => {
            database.sequelize.query(
                `
                SELECT *
                FROM survey_instance AS si
                JOIN survey_template st
                ON st.id = si.surveyTemplateId
                JOIN join_surveys_and_questions jsq
                ON jsq.surveyTemplateId = st.id
                JOIN question_template qt
                ON qt.id = jsq.questionTemplateId
                JOIN join_questions_and_options jqo
                ON jqo.questionTemplateId = qt.id
                JOIN question_option qo
                ON qo.id = jqo.questionOptionId
                WHERE si.id = ?
                ORDER BY jsq.questionOrder, jqo.optionOrder
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        currentSurveyInstance.id
                    ]
                }
            )
            .then((data) => {
                const final = {
                    surveyInstanceID: _.chain(data).first().get('id').value(),
                    surveyName: _.chain(data).first().get('name').value(),
                    message: 'SUCCESS',
                    questions: _.chain(data).groupBy('questionOrder').map(processSurveyInstance).value()
                };

                reply(final);
            });
        });
    })
    .catch((err) => {
        reply(boom.badRequest(err));
    });
}

module.exports = getSurvey;
