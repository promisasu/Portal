'use strict';

/**
 * @module controller/handler/patient
 */

const database = require('../../model');
const processSurveyInstances = require('../helper/process-survey-instances');
const moment = require('moment');
const httpNotFound = 404;


/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientView (request, reply) {
    console.log('patient js');
    Promise
        .all([
            database.sequelize.query(
                `
                SELECT pa.PatientPin, pa.ParentPinFK, st.Name AS stage
                FROM patients AS pa
                JOIN stage AS st
                ON st.StageId = pa.StageIdFK
                WHERE pa.PatientPin = ?
                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ],
                    plain: true
                }
            ),
            database.sequelize.query(
                `
                SELECT pa.DateCompleted, si.ActivityInstanceId, si.StartTime, si.EndTime, si.UserSubmissionTime,
                si.ActualSubmissionTime, si.activityTitle,si.State as state, st.Name AS stageName
                FROM patients AS pa
                JOIN activity_instance AS si
                ON si.PatientPinFK = pa.PatientPin
                JOIN stage AS st
                ON st.StageId = pa.StageIdFK
                WHERE pa.PatientPin = ?
                ORDER BY si.StartTime
                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ]
                }
            ),
            database.sequelize.query(
                `
                SELECT tr.Name, tr.TrialId
                FROM patients AS pa
                JOIN stage AS st
                ON st.StageId = pa.StageIdFK
                JOIN trial AS tr
                ON tr.TrialId = st.TrialId
                WHERE pa.PatientPin = ?
                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ],
                    plain: true
                }
            ),
            database.sequelize.query(
                `
                SELECT ai.PatientPinFK as pin, ai.activityTitle as name,
                ai.UserSubmissionTime as date, act.ActivityInstanceIdFk as id,
                act.questionIdFk as questionId, act.questionOptionIdFk as optionId,
                ans.OptionText as optionText, que.SurveyBlockIdFk as questionType,
                ai.StartTime as StartTime, ans.likertScale as likertScale, pi.type as patientType
                FROM question_result act
                JOIN questions que
                ON act.questionIdFk = que.QuestionId
                JOIN question_options ans
                ON act.questionOptionIdFk = ans.QuestionOptionId
                JOIN activity_instance ai
                ON act.ActivityInstanceIdFk = ai.ActivityInstanceId
                JOIN patients pi
                ON ai.PatientPinFK = pi.PatientPin
                WHERE act.ActivityInstanceIdFk
                IN (SELECT ActivityInstanceId FROM activity_instance WHERE PatientPinFK = ?
                and State='completed' and ai.activityTitle='Sickle Cell Weekly Survey');

                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ]
                }
            ),
            database.sequelize.query(
              `
              SELECT ai.PatientPinFK as pin, ai.activityTitle as name,
               ai.UserSubmissionTime as date, act.ActivityInstanceIdFk as id,
               act.questionIdFk as questionId, act.questionOptionIdFk as optionId,
               ans.OptionText as optionText, act.dosage, que.SurveyBlockIdFk as questionType,
               ai.StartTime as StartTime, ans.likertScale as likertScale,
               pi.type as patientType, mi.prescribedDosage,
               mi.noOfTablets as prescribedNoOfTablets
               FROM question_result act
               JOIN questions que
               ON act.questionIdFk = que.QuestionId
               JOIN question_options ans
               ON act.questionOptionIdFk = ans.QuestionOptionId
               JOIN activity_instance ai
               ON act.ActivityInstanceIdFk = ai.ActivityInstanceId
               JOIN patients pi
               ON ai.PatientPinFK = pi.PatientPin
               JOIN medication_information mi
               ON mi.PatientPINFK = ai.PatientPinFK and mi.MedicationName = ans.optionText
               WHERE act.ActivityInstanceIdFk
               IN (SELECT ActivityInstanceId FROM activity_instance WHERE PatientPinFK = ?
               and State='completed' and ai.activityTitle='Sickle Cell Daily Survey');
                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ]
                }
            ),
            database.sequelize.query(
                `
                SELECT ai.PatientPinFK as pin, ai.activityTitle as name,
                ai.UserSubmissionTime as date, act.ActivityInstanceIdFk as id,
                act.questionIdFk as questionId, act.questionOptionIdFk as optionId,
                ans.OptionText as optionText, que.SurveyBlockIdFk as questionType,
                ai.StartTime as StartTime, ans.likertScale as likertScale, pi.type as patientType
                FROM question_result act
                JOIN questions que
                ON act.questionIdFk = que.QuestionId
                JOIN question_options ans
                ON act.questionOptionIdFk = ans.QuestionOptionId
                JOIN activity_instance ai
                ON act.ActivityInstanceIdFk = ai.ActivityInstanceId
                JOIN patients pi
                ON ai.PatientPinFK = pi.PatientPin
                WHERE act.ActivityInstanceIdFk
                IN (SELECT ActivityInstanceId FROM activity_instance WHERE PatientPinFK = ?
                and State='completed' and que.questionId IN (74));

                `, {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.pin
                    ]
                }
            )

        ])
        .then(([currentPatient, surveyInstances, currentTrial, surveyResults, opioidResults, bodyPainResults]) => {
            let dataChart = processSurveyInstances(surveyInstances);

            if (!currentPatient) {
                throw new Error('patient does not exist');
            }
            let clinicalValuesChart = processSurveyInstances.processClinicanData(
                surveyInstances, surveyResults, bodyPainResults, opioidResults
                );

            return reply.view('patient', {
                title: 'Pain Reporting Portal',
                patient: currentPatient,
                trial: currentTrial,
                surveys: surveyInstances.map((surveyInstance) => {
                    const surveyInstanceCopy = Object.assign({}, surveyInstance);

                    surveyInstanceCopy.startTime = moment(surveyInstanceCopy.StartTime)
                        .format('MM-DD-YYYY');
                    surveyInstanceCopy.endTime = moment(surveyInstanceCopy.EndTime)
                        .format('MM-DD-YYYY');
                    if (surveyInstanceCopy.UserSubmissionTime) {
                        surveyInstanceCopy.UserSubmissionTime = moment(surveyInstanceCopy.UserSubmissionTime)
                            .format('MM-DD-YYYY h:mma');
                    }
                    if (surveyInstanceCopy.ActualSubmissionTime) {
                        surveyInstanceCopy.ActualSubmissionTime = moment(surveyInstanceCopy.ActualSubmissionTime)
                            .format('MM-DD-YYYY h:mma');
                    }

                    return surveyInstanceCopy;
                }),
                datesJson: JSON.stringify(dataChart),
                clinicalValues: JSON.stringify(clinicalValuesChart)
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

module.exports = patientView;
