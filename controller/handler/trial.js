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

    trial.findById(request.params.id).then((currentTrial) => {
        currentTrial.getPatients()
        .then((patients) => {
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
        });
    })
    .catch(() => {
        reply.redirect('/404');
    });
}

module.exports = trialView;
