'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');
const getCount = require('../helper/process-compliance-count');

/**
 * A dashboard with an overview of a specific trial.
 * @function getComplianceCount
 * @param {row} currentTrial - Row
 * @param {row} stages - Row
 * @param {row} patients - Row
 * @param {int} trialId - int
 * @param {View} reply - Row
 * @returns {View} Rendered page
 */
function getComplianceCount (currentTrial, stages, patients, trialId, reply) {
    const startDate = moment().startOf('Week');

    database
    .sequelize
    .query(

        `
        SELECT pa.id,
        SUM(si.state = 'expired') AS expiredCount
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
                trialId,
                startDate.toISOString()
            ]
        }
        )
        .then((data) => {
            reply.view('trial', {
                title: 'Pain Reporting Portal',
                trial: processTrial(currentTrial),
                stages,
                patients: patients.map(processPatient),
                graphData: JSON.stringify({
                    datasets: getCount(data),
                    labels: [
                        'Compliant',
                        'Semicompliant',
                        'Noncompliant'
                    ]
                })
            });
        })
        .catch((err) => {
            console.error(err);
            reply.view('404', {
                title: 'Not Found'
            });
        });
}
module.exports = getComplianceCount;
