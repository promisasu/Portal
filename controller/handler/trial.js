'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialView (request, reply) {
    database.sequelize.query(
        `
        SELECT *
        FROM trial as tr
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
    )
    .then((data) => {
        console.log(data);
        reply.view('trial', {
            title: 'Pain Reporting Portal',
            trial: processTrial(data),
            graphData: JSON.stringify({
                // TODO add real data
                datasets: [],
                labels: [
                    'Compliant',
                    'Semicompliant',
                    'Noncompliant'
                ]
            }),
            patients: data.map(processPatient)
        });
    })
    .catch(() => {
        reply.redirect('/404');
    });
}

module.exports = trialView;
