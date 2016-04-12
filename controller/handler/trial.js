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
    const fromDate = request.query.fromDate;
    const toDate = request.query.toDate;

    Promise
        .all([
            trial.findById(request.params.id),
            stage.findAll({
                where: {
                    trialId: request.params.id
                }
            }),
            database.sequelize.query(
                `
                SELECT tr.*, pa.pin, st.name AS stage
                FROM trial AS tr
                JOIN stage AS st
                ON st.trialId = tr.id
                JOIN patient AS pa
                ON pa.stageId = st.id
                WHERE tr.id = ?
                AND pa.deletedAt IS NULL
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
                SELECT pa.id, pa.pin,
                SUM(si.state = 'expired') AS expiredCount,
                SUM(si.state = 'completed') AS completedCount
                FROM survey_instance AS si
                JOIN patient AS pa
                ON pa.id = si.patientId
                JOIN stage AS st
                ON st.id = pa.stageId
                WHERE st.trialId = ?
                AND si.startTime >= ?
                AND si.endTime <= ?
                AND pa.deletedAt IS NULL
                GROUP BY pa.id
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id,
                        fromDate.toISOString(),
                        toDate.toISOString()
                    ]
                }
            ),
            database.sequelize.query(
                `
                SELECT jcns.rule
                FROM trial AS tr
                JOIN stage AS st
                ON tr.id = st.trialId
                JOIN join_current_and_next_stages AS jcns
                ON st.id = jcns.stageId
                WHERE tr.id = ?
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
            const currentTrial = data[0];

            if (!currentTrial) {
                throw new Error('trial does not exist');
            }

            const stages = data[1];
            const patients = data[2];
            const compliance = data[3];
            const rules = data[4];
            const ruleValues = rules.map((ruleData) => {
                return parseInt(ruleData.rule, 10);
            });
            const complianceCount = processComplianceCount(compliance);
            const patientCount = patients.length;
            const patientStatuses = compliance.map(processPatientStatus);

            const patientArray = patients.map((patient) => {
                  // check for patient's status
                const patientStatus = patientStatuses.find((status) => {
                    return status.pin === patient.pin;
                });

                // collect the compliance status as well as expiredCount
                if (patientStatus) {
                    patient.status = patientStatus.status;
                    patient.totalMissed = patientStatus.expiredCount;
                } else {
                    patient.status = 'Pending';
                    patient.totalMissed = 0;
                }

                return patient;
            });

            const endDate = processRules(ruleValues, Date.now());

            return reply.view('trial', {
                title: 'Pain Reporting Portal',
                fromDate: moment(fromDate).format('YYYY-MM-DD'),
                toDate: moment(toDate).format('YYYY-MM-DD'),
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
            request.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = trialView;
