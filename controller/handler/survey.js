'use strict';

/**
 * @module controller/handler/survey
 */

const groupBy = require('../helper/group-by.js');
const database = require('../../model');

/**
 * A dashboard with an overview of a specific survey.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function surveyView (request, reply) {
    Promise
    .all([
        // all of the responses for the survey
        database.sequelize.query(
            `
            SELECT qo.id
            FROM survey_instance AS si
            JOIN question_result AS qr
            ON qr.surveyInstanceId = si.id
            JOIN question_option AS qo
            ON qo.id = qr.questionOptionId
            WHERE si.id = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.id
                ]
            }
        ),
        // all the questions and optional
        // includes both answered and unanswered
        database.sequelize.query(
            `
            SELECT *, si.id AS surveyId, qt.id AS questionId, qo.id AS optionId
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
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.id
                ]
            }
        ),
        database.sequelize.query(
            `
            SELECT pa.pin, tr.id, tr.name
            FROM survey_instance AS si
            JOIN patient AS pa
            ON pa.id = si.patientId
            JOIN stage as st
            ON st.id = pa.stageId
            JOIN trial AS tr
            ON tr.id = st.trialId
            WHERE si.id = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                plain: true,
                replacements: [
                    request.params.id
                ]
            }
        )
    ])
    .then((data) => {
        const surveyResponses = data[0];
        const surveyInstanceAndQuestions = data[1];
        const patientAndTrial = data[2];
        const negative = -1;

        let questionsWithResponses = surveyInstanceAndQuestions.map((item) => {
            if (surveyResponses.indexOf(item.optionId) > negative) {
                item.selected = true;
                return item;
            }
            return item;
        });

        questionsWithResponses = groupBy(questionsWithResponses, 'questionId');

        reply.view('survey', {
            title: 'Pain Reporting Portal',
            patient: {
                pin: patientAndTrial.pin
            },
            trial: {
                id: patientAndTrial.id,
                name: patientAndTrial.name
            },
            survey: surveyInstanceAndQuestions[0],
            questions: questionsWithResponses
        });
    })
    .catch((err) => {
        console.error(err);
        reply.view('404', {
            title: 'Not Found'
        });
    });
}

module.exports = surveyView;
