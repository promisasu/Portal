'use strict';

/**
 * @module controller/handler/patient
 */

const database = require('../../model');
const processSurveyToEvent = require('../helper/process-survey-to-event');
const processSurveyInstances = require('../helper/process-survey-instances');
const moment = require('moment');

/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientView (request, reply) {
    return Promise
        .all([
            database.sequelize.query(
                `
                SELECT *, st.name AS stage
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
                SELECT *, si.id, st.name AS stageName, srt.name AS surveyTemplateName
                FROM patient AS pa
                JOIN survey_instance AS si
                ON si.patientId = pa.id
                JOIN stage AS st
                ON st.id = pa.stageId
                JOIN survey_template AS srt
                ON srt.id = si.surveyTemplateId
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
                patient: currentPatient,
                trial: currentTrial,
                surveys: surveyInstances.map((surveyInstance) => {
                    surveyInstance.startTime = moment(surveyInstance.startTime).format('MM-DD-YYYY');
                    surveyInstance.endTime = moment(surveyInstance.endTime).format('MM-DD-YYYY');
                    if (surveyInstance.userSubmissionTime) {
                        surveyInstance.userSubmissionTime = moment(surveyInstance.userSubmissionTime)
                        .format('MM-DD-YYYY');
                    }
                    return surveyInstance;
                }),
                datesJson: JSON.stringify(processSurveyInstances(surveyInstances)),
                eventsJson: JSON.stringify(surveyInstances.map(processSurveyToEvent))
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
