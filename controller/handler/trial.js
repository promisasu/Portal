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
    const trial = database.sequelize.model('trial');

    Promise.all([
        trial.findById(request.params.id),
        database.sequelize.query(
            `
            SELECT *
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
        )
    ])

    .then((data) => {
        const currentTrial = data[0];
        const patients = data[1];

        reply.view('trial', {
            title: 'Pain Reporting Portal',
            trial: processTrial(currentTrial),
            graphData: JSON.stringify({
                // TODO add real data
                datasets: [],
                labels: [
                    'Compliant',
                    'Semicompliant',
                    'Noncompliant'
                ]
            }),
            patients: patients.map(processPatient)
        });
    })
    .catch(() => {
        reply.redirect('/404');
    });
}

module.exports = trialView;
