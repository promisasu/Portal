'use strict';

/**
 * @module api/handler/get-survey
 */

const database = require('../../model');
const processSurveyInstance = require('../helper/process-survey-instance');
const groupBy = require('../helper/group-by');
const boom = require('boom');

/**
 * Gets all of the QuestionTemplates and QuestionOptions for a SurveyTemplate
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function getSurvey (request, reply) {
    const surveyInstance = database.sequelize.model('survey_instance');
    let currentSurveyInstance = null;

    // find survey instance
    surveyInstance
    .find({
        where: {
            id: request.query.surveyInstanceID
        }
    })
    // check that survey instance is active and is not yet expired or completed
    .then((resultSurveyInstance) => {
        const now = new Date();

        if (!resultSurveyInstance) {
            throw new Error('Invalid survey instance ID');
        }

        if (now < resultSurveyInstance.startTime) {
            throw new Error('Survey instance is not active');
        } else if (now > resultSurveyInstance.endTime) {
            throw new Error('Survey instance has expired');
        } else if (resultSurveyInstance.state === 'completed') {
            throw new Error('Survey instance has been completed');
        }
        currentSurveyInstance = resultSurveyInstance;
        currentSurveyInstance.state = 'in progress';

        return currentSurveyInstance.save();
    })
    // Gather all the questions and question options for the survey
    .then(() => {
        return database.sequelize.query(
            `
            SELECT * , qo.id AS qoid, si.id AS sid
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
        );
    })
    .then((data) => {
        return reply({
            surveyInstanceID: data[0].sid,
            surveyName: data[0].name,
            message: 'SUCCESS',
            questions: groupBy(data, 'questionOrder').map(processSurveyInstance)
        });
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest(err));
    });
}

module.exports = getSurvey;
