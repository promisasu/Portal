'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');
const processComplianceCount = require('../helper/process-compliance-count');
const processRule = require('../helper/process-rule');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialView (request, reply) {
    const trial = database.sequelize.model('trial');
    const stage = database.sequelize.model('stage');
    const startDate = moment().startOf('Week');

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
              SELECT *, st.name as stage
              FROM trial AS tr
              JOIN stage AS st
              ON st.trialId = tr.id
              JOIN patient AS pa
              ON pa.stageId = st.id
              WHERE tr.id = ?
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
              SELECT pa.id,
              SUM(si.state = 'expired') AS expiredCount,
              SUM(si.state = 'completed') AS completedCount
              FROM survey_instance AS si
              JOIN patient AS pa
              ON pa.id = si.patientId
              JOIN stage AS st
              ON st.id = pa.stageId
              WHERE st.trialId = ?
              AND si.endTime > ?
              GROUP BY pa.id
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
            const stages = data[1];
            const patients = data[2];
            const compliance = data[3];
            const rules = data[4];
            const ruleValues = rules.map((ruleData) => {
                return parseInt(ruleData.rule, 10);
            });
            const initRule = 0;

            reply.view('trial', {
                title: 'Pain Reporting Portal',
                trial: processTrial(currentTrial),
                stages,
                patients: patients.map(processPatient),
                graphData: JSON.stringify({
                    datasets: processComplianceCount(compliance),
                    labels: [
                        'Compliant',
                        'Semicompliant',
                        'Noncompliant'
                    ]
                }),
                endDate: processRule(ruleValues.reduce((preVal, postVal) => {
                    return preVal + postVal;
                }, initRule))
            });
        })
        .catch((err) => {
            console.error(err);
            reply.view('404', {
                title: 'Not Found'
            });
        });
}

module.exports = trialView;
