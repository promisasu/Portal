'use strict';

/**
 * @module controller/handler/patient
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processSurveyToEvent = require('../helper/process-survey-to-event');
const processSurveyInstances = require('../helper/process-survey-instances');

/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientView (request, reply) {
    return Promise.all([

        database.sequelize.query(
            `
            SELECT *, st.name as stage
            FROM patient AS pa
            JOIN stage AS st
            ON st.id = pa.stageId
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        ),
        database.sequelize.query(
            `
            SELECT *, si.id
            FROM patient AS pa
            JOIN survey_instance AS si
            ON si.patientId = pa.id
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        ),
        database.sequelize.query(
            `
            SELECT tr.name, tr.id
            FROM patient AS pa
            JOIN stage AS st
            ON st.id = pa.stageId
            JOIN trial AS tr
            ON tr.id = st.trialId
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        )
    ])
    .then((data) => {
        const currentPatient = data[0][0];
        const surveyInstances = data[1];
        const currentTrial = data[2][0];

        reply.view('patient', {
            title: 'Pain Reporting Portal',
            patient: processPatient(currentPatient),
            trial: currentTrial,
            surveys: surveyInstances,
            datesJson: JSON.stringify(processSurveyInstances(surveyInstances)),
            eventsJson: JSON.stringify(surveyInstances.map(processSurveyToEvent)),
            // TODO get real survey data
            surveysJson: JSON.stringify([])
        });
    })
    .catch((err) => {
        console.error(err);
        reply.view('404', {
            title: 'Not Found'
        });
    });
}

module.exports = patientView;
