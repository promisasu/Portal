'use strict';

/**
 * @module api/handler/get-survey
 */

const database = require('../../model');
const processSurveyInstance = require('../helper/process-survey-instance');
const groupBy = require('../helper/group-by');
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
                SELECT * , qo.id
                FROM survey_instance AS si
                JOIN survey_template AS st
                ON st.id = si.surveyTemplateId
                JOIN join_surveys_and_questions AS jsq
                ON jsq.surveyTemplateId = st.id
                JOIN question_template AS qt
                ON qt.id = jsq.questionTemplateId
                JOIN question_option AS qo
                ON qo.questionTemplateId = qt.id
                WHERE si.id = ?
                ORDER BY jsq.questionOrder, qo.order
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
                    surveyInstanceID: data[0].id,
                    surveyName: data[0].name,
                    message: 'SUCCESS',
                    questions: groupBy(data, 'questionOrder').map(processSurveyInstance)
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
