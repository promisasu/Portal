'use strict';

/**
 * @module controller/handler/survey
 */

const groupBy = require('../helper/group-by.js');
const database = require('../../model');
const httpNotFound = 404;

/**
 * A dashboard with an overview of a specific survey.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function surveyView (request, reply) {
    const surveyInstance = database.sequelize.model('survey_instance');

    Promise
    .all([
        surveyInstance.findById(request.params.id),
        database.sequelize.query(
            `
            SELECT jsq.questionOrder, qt.id AS questionId, qt.questionText, qo.id AS optionId, qo.optionText
            FROM survey_instance AS si
            JOIN survey_template AS st
            ON st.id = si.surveyTemplateId
            JOIN join_surveys_and_questions AS jsq
            ON jsq.surveyTemplateId = st.id
            JOIN question_template AS qt
            ON qt.id = jsq.questionTemplateId
            JOIN question_option AS qo
            ON qo.questionTemplateId = qt.id
            JOIN question_result AS qr
            ON qr.surveyInstanceId = si.id
            AND qr.questionOptionId = qo.id
            WHERE si.id = ?
            ORDER BY jsq.questionOrder, qo.order
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
        const survey = data[0];
        const groupedQuestions = groupBy(data[1], 'questionId');
        const patientAndTrial = data[2];

        reply.view('survey', {
            title: 'Pain Reporting Portal',
            survey,
            patient: {
                pin: patientAndTrial.pin
            },
            trial: {
                id: patientAndTrial.id,
                name: patientAndTrial.name
            },
            questions: groupedQuestions
        });
    })
    .catch((err) => {
        request.log('error', err);

        reply
        .view('404', {
            title: 'Not Found'
        })
        .code(httpNotFound);
    });
}

module.exports = surveyView;
