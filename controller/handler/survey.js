'use strict';

/**
 * @module controller/handler/survey
 */

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
        database.sequelize.query(
            `
            SELECT *
            FROM survey_instance AS si
            JOIN question_result AS qr
            ON qr.surveyInstanceId = si.id
            JOIN question_option AS qo
            ON qo.id = qr.questionOptionId
            JOIN question_template AS qt
            ON qt.id = qo.questionTemplateId
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
                replacements: [
                    request.params.id
                ]
            }
        )
    ])
    .then((data) => {
        const surveyResponses = data[0];
        const patientAndTrial = data[1][0];

        console.log(surveyResponses, patientAndTrial);

        reply.view('survey', {
            title: 'Pain Reporting Portal',
            patient: {
                pin: patientAndTrial.pin
            },
            trial: {
                id: patientAndTrial.id,
                name: patientAndTrial.name
            },
            survey: surveyResponses
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
