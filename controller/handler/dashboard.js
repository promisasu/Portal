'use strict';

/**
 * @module controller/handler/dashboard
 */
const processTrial = require('../helper/process-trial');

const database = require('../../model');

/**
 * A dashboard view with overview of all trials and patients.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function dashboardView (request, reply) {
    const trial = database.sequelize.model('trial');

    trial
    .findAll()
    .then((trials) => {
        // Process data into format expected in view
        const trialData = trials.map(processTrial);

        // Display view
        reply.view('dashboard', {
            title: 'Pain Reporting Portal',
            user: request.auth.credentials,
            overall: {
                inProgress: null,
                percentRecruited: null,
                averageCompliance: null
            },
            status: {
                patientCount: null,
                riskCount: null,
                noncompliantCount: null
            },
            trials: trialData,
            graphData: JSON.stringify({
                labels: [
                    'Compliant',
                    'Semicompliant',
                    'Noncompliant'
                ],
                // TODO real data
                datasets: []
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

module.exports = dashboardView;
