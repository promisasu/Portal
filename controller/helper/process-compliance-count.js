'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');

function getCount(row)
{
    var redCount = 0;
    var yellowCount = 0;
    var greenCount = 0;

    console.log("prabhanjan");
    //console.log(len(row));
    var firstrow = null;
    for (let item of row)
    {
        console.log("here");
        firstrow = item;
    }

    for(var i=0; i < firstrow.length; i++)
    {
        if(firstrow[i].expiredCount > 2)
        {
            redCount += 1;
        }
        else if( (firstrow[i].expiredCount > 0) && (firstrow[i].expiredCount <= 2)) {
            yellowCount += 1;
        }
        else {
            greenCount += 1;
        }
    }
    console.log(String(greenCount));
    console.log(String(yellowCount));
    console.log(String(redCount));
    var myArray = [greenCount, yellowCount, redCount];
    console.log(myArray);

    return myArray;
}

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function getComplianceCount(currentTrial, stages, patients, reply)
{
    var startDate = moment().startOf('Week');
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
                    startDate.toISOString()
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
                datasets: getCount(data),
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
