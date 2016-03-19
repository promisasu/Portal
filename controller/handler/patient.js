'use strict';

/**
 * @module controller/handler/patient
 */

const database = require('../../model');
const processSurveyInstances = require('../helper/process-survey-instances');
const moment = require('moment');
const sqlDateFormat = 'ddd MMM DD YYYY HH:mm:ss ZZ';
const httpNotFound = 404;

/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientView (request, reply) {
    Promise
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
                ORDER BY si.startTime
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
                    const surveyInstanceCopy = Object.assign({}, surveyInstance);

                    surveyInstanceCopy.startTime = moment(surveyInstanceCopy.startTime, sqlDateFormat)
                        .format('MM-DD-YYYY');
                    surveyInstanceCopy.endTime = moment(surveyInstanceCopy.endTime, sqlDateFormat)
                        .format('MM-DD-YYYY');
                    if (surveyInstanceCopy.userSubmissionTime) {
                        surveyInstanceCopy.userSubmissionTime
                            = moment(surveyInstanceCopy.userSubmissionTime, sqlDateFormat)
                                .format('MM-DD-YYYY h:mma');
                    }

                    return surveyInstanceCopy;
                }),
                complianceType: surveyInstances[0].surveyTemplateId,
                datesJson: JSON.stringify(processSurveyInstances(surveyInstances))
            });
        })
        .catch((err) => {
            console.error(err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = patientView;
