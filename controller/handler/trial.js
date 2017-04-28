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
    const startDate = moment('2016-11-23');

    Promise
        .all([
            trial.findById(request.params.id),
            database.sequelize.query(
                `
                SELECT StageId, Name, CreatedAt, UpdatedAt, DeletedAt, TrialId
                FROM stage AS stage
                WHERE stage.DeletedAt IS NULL
                AND stage.TrialId = ?
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
                SUM(si.State = 'expired' and si.activityTitle = 'Sickle Cell Weekly Survey') AS expiredWeeklyCount,
                SUM(si.State = 'completed' and si.activityTitle = 'Sickle Cell Weekly Survey') AS completedWeeklyCount,
                SUM(si.State = 'expired' and si.activityTitle = 'Sickle Cell Daily Survey') AS expiredDailyCount,
                SUM(si.State = 'completed' and si.activityTitle = 'Sickle Cell Daily Survey') AS completedDailyCount,
                SUM(si.State = 'pending') AS pendingCount,
                SUM(si.State = 'DEACTIVATED') AS deactivatedCount,
                SUM(si.State = 'expired' and si.activityTitle = 'Sickle Cell Weekly Survey'
                    and si.EndTime > DATE_SUB(now(), INTERVAL 8 DAY)
                    and si.EndTime < now()) AS expiredTrendingWeeklyCount,
                SUM(si.State = 'completed' and si.activityTitle = 'Sickle Cell Weekly Survey'
                    and si.EndTime > DATE_SUB(now(), INTERVAL 8 DAY)
                    and si.EndTime < now()) AS completedTrendingWeeklyCount,
                SUM(si.State = 'expired' and si.activityTitle = 'Sickle Cell Daily Survey'
                    and si.EndTime > DATE_SUB(now(), INTERVAL 8 DAY)
                    and si.EndTime < now()) AS expiredTrendingDailyCount,
                SUM(si.State = 'completed' and si.activityTitle = 'Sickle Cell Daily Survey'
                    and si.EndTime > DATE_SUB(now(), INTERVAL 8 DAY)
                    and si.EndTime < now()) AS completedTrendingDailyCount
                FROM activity_instance AS si
                JOIN patients AS pa
                ON pa.PatientPin = si.PatientPinFK
                JOIN stage AS st
                ON st.StageId = pa.StageIdFK
                WHERE st.TrialId = ?
                GROUP BY pa.PatientPin
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id,
                        startDate.toISOString()
                    ]
                }
            ),
            database.sequelize.query(
              `
              SELECT State, EndTime, PatientPinFK
              FROM activity_instance
              WHERE activityTitle = 'Sickle Cell Weekly Survey'
              AND EndTime > DATE_SUB(now(),INTERVAL 8 DAY)
              AND EndTime <= now()
              AND State != 'pending'
              ORDER BY EndTime
              DESC
              `,
                {
                    type: database.sequelize.QueryTypes.SELECT
                }
            )
        ])
        .then(([currentTrial, stages, patients, compliance, missedLastWeek]) => {
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
                const patientStatus = patientStatuses.find((status) => {
                    return status.PatientPin === patient.PatientPin;
                });

                let missedWeekly = missedLastWeek.find((missed) => {
                    return missed.PatientPinFK === patient.PatientPin;
                });

                if (missedWeekly) {
                    if (typeof patient.lastWeekly === 'undefined') {
                        if (missedWeekly.State === 'expired') {
                            patient.lastWeekly = 'Missed';
                        } else if (missedWeekly.State === 'completed') {
                            patient.lastWeekly = 'Taken';
                        }
                    }
                } else {
                    patient.lastWeekly = ' ---- ';
                }

                // collect the compliance status as well as expiredCount
                if (patientStatus) {
                    patient.trialStatus = patientStatus.trialStatus;
                    patient.status = patientStatus.status;
                    if (isNaN(patientStatus.compliancePercentage)) {
                        patient.compliancePercentage = ' ---- ';
                    } else {
                        patient.compliancePercentage = patientStatus.compliancePercentage;
                    }
                    if (isNaN(patientStatus.trendingCompliance)) {
                        patient.trendingCompliance = ' ---- ';
                    } else {
                        patient.trendingCompliance = patientStatus.trendingCompliance;
                    }
                } else {
                    patient.status = 'Pending';
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
            console.log('ERRORCUSTOM - ', err);
            request.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = trialView;
