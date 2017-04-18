'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processTrial = require('../helper/process-trial');
const moment = require('moment');
const processComplianceCount = require('../helper/process-compliance-count');
const processRules = require('../helper/process-rules');
const processPatientStatus = require('../helper/process-patient-status');
const httpNotFound = 404;

/**
 * A dashboard with an overview of a specific trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialView (request, reply) {
    const trial = database.sequelize.model('trial');
    const stage = database.sequelize.model('stage');
    const startDate = moment("2016-11-23");
    console.log("req params - " + request.params.id);

    Promise
        .all([
            trial.findById(request.params.id),
            database.sequelize.query(
                `
                SELECT StageId, Name, CreatedAt, UpdatedAt, DeletedAt, TrialId FROM stage AS stage WHERE stage.DeletedAt IS NULL AND stage.TrialId = ?
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
                SELECT tr.*, pa.PatientPin, pa.DateStarted, pa.DateCompleted, st.Name AS stage
                FROM trial AS tr
                JOIN stage AS st
                ON st.TrialId = tr.TrialId
                JOIN patients AS pa
                ON pa.StageIdFK = st.StageId
                WHERE tr.TrialId = ?
                ORDER BY pa.DateCompleted DESC
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
                SELECT pa.PatientPin,
                SUM(si.State = 'expired') AS expiredCount,
                SUM(si.State = 'completed') AS completedCount
                FROM activity_instance AS si
                JOIN patients AS pa
                ON pa.PatientPin = si.PatientPinFK
                JOIN stage AS st
                ON st.StageId = pa.StageIdFK
                WHERE st.TrialId = ?
                AND si.EndTime > ?
                GROUP BY pa.PatientPin
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id,
                        startDate.toISOString()
                    ]
                }
            )
            //,
            // database.sequelize.query(
            //     `
            //     SELECT jcns.rule
            //     FROM trial AS tr
            //     JOIN stage AS st
            //     ON tr.TrialId = st.trialId
            //     JOIN join_current_and_next_stages AS jcns
            //     ON st.id = jcns.stageId
            //     WHERE tr.TrialId = ?
            //     `,
            //     {
            //         type: database.sequelize.QueryTypes.SELECT,
            //         replacements: [
            //             request.params.id
            //         ]
            //     }
            // )
        ])
        .then(([currentTrial, stages, patients, compliance]) => {
            const rules = [];
            if (!currentTrial) {
                throw new Error('trial does not exist');
            }
            const ruleValues = rules.map((ruleData) => {
                return parseInt(ruleData.rule, 10);
            });
            const complianceCount = processComplianceCount(compliance);
            const patientCount = patients.length;
            const patientStatuses = compliance.map(processPatientStatus);

            const patientArray = patients.map((patient) => {
                  // check for patient's status

                const patientStatus = patientStatuses.find((status) => {

                    return status.PatientPin === patient.PatientPin;
                });
                // collect the compliance status as well as expiredCount
                if (patientStatus) {
                    patient.status = patientStatus.status;
                    patient.totalMissed = patientStatus.expiredCount;
                } else {
                    patient.status = 'Pending';
                    patient.totalMissed = 0;
                }
                patient.DateStarted = moment(patient.DateStarted)
                    .format('MM-DD-YYYY');
                patient.DateCompleted = moment(patient.DateCompleted)
                    .format('MM-DD-YYYY');

                return patient;
            });

            const endDate = processRules(ruleValues, Date.now());

            return reply.view('trial', {
                title: 'Pain Reporting Portal',
                trial: processTrial(currentTrial),
                stages,
                endDate,
                patients: patientArray,
                complianceCount,
                patientCount,
                graphData: JSON.stringify({
                    datasets: complianceCount,
                    labels: [
                        'Compliant',
                        'Semicompliant',
                        'Noncompliant'
                    ]
                })
            });
        })
        .catch((err) => {
            console.log("ERRORCUSTOM - ", err);
            request.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = trialView;
