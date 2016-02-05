'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function getComplianceCount(currentTrial, stages, patients, reply)
{
    var startDate = moment().subtract(moment().weekday(), 'days');
    Promise.all([
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
                    startDate
                ]
            }
        )
    ])
    .then((data)=> {
	reply.view('trial', {
            title: 'Pain Reporting Portal',
            trial: processTrial(currentTrial),
            stages,
            patients: patients.map(processPatient),
            graphData: JSON.stringify({
                // TODO add real data
                datasets: [19, 29, 40],
                labels: [
                    'Compliant',
                    'Semicompliant',
                    'Noncompliant'
                ]
            })
        });
    }
)    .catch((err) => {
        console.error(err);
	console.log("prabhanjan found error in controller/process-compliance");
        reply.view('404', {
            title: 'Not Found'
        });
    });


}

module.exports = getComplianceCount;
