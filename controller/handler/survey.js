'use strict';

/**
 * @module controller/handler/survey
 */

const database = require('../../model');
const processSurvey = require('../helper/process-survey');

/**
 * A dashboard with an overview of a specific survey.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function surveyView (request, reply) {
    Promise.all([
        database.sequelize.query(
            `
            SELECT *
            FROM survey_instance AS si
            JOIN survey_template AS st
            ON st.id = si.surveyTemplateId
            JOIN question_result AS qr
            ON qr.surveyInstanceId = si.id
            JOIN question_template AS qt
            ON qt.id = qr.questionTemplateId
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
        database.sequelize.query(
            `
            SELECT p.pin, t.id, t.name
            FROM survey_instance AS si
            JOIN patient AS pa
            ON pa.id = si.patientId
            JOIN trial AS tr
            ON tr.id = p.trialId
            WHERE si.id = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.id
                ]
            }
        )
    ])
    .then((data) => {
        const currentSurvey = data[0];
        const patientAndTrial = data[1][0];

        reply.view('survey', {
            title: 'Pain Reporting Portal',
            patient: {
                pin: patientAndTrial.pin
            },
            trial: {
                id: patientAndTrial.id,
                name: patientAndTrial.name
            },
            survey: processSurvey(currentSurvey)
        });
    })
    .catch(() => {
        reply.redirect('/404');
    });
}

module.exports = surveyView;
