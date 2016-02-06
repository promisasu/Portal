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
 * @param {View} reply - Row
 * @returns {View} Rendered page
 */
function getComplianceCount (currentTrial, stages, patients, reply) {
    const startDate = moment().startOf('Week');

    Promise
        .all([
            database.sequelize.query(
                `
        select patientId,
        sum(case when state = 'expired' then 1 else 0 end) as expiredCount
        from survey_instance
        where survey_instance.endTime > ?
        group by patientId
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
            startDate.toISOString()
            ]
        }
        )
        ])
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
        }).catch((err) => {
            console.error(err);
            reply.view('404', {
                title: 'Not Found'
            });
        });
}
module.exports = getComplianceCount;
