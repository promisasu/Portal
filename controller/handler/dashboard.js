'use strict';

/**
 * @module controller/handler/dashboard
 */
const processTrial = require('../helper/process-trial');

const database = require('../../model');

const fakeData = {
    patientCount: 2032,
    riskCount: 52,
    noncompliantCount: 11,
    large: 100,
    medium: 50,
    small: 10
};

/**
 * A dashboard view with overview of all trials and patients.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function dashboardView (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.findAll().then((trials) => {
        // Process data into format expected in view
        const trialData = trials.map(processTrial);

        // Display view
        reply.view('dashboard', {
            title: 'Pain Reporting Portal',
            user: request.auth.credentials,
            status: {
                patientCount: fakeData.patientCount,
                riskCount: fakeData.riskCount,
                noncompliantCount: fakeData.noncompliantCount
            },
            trials: trialData,
            graphData: JSON.stringify({
                labels: [
                    'Compliant',
                    'Semicompliant',
                    'Noncompliant'
                ],
                datasets: [
                    {
                        label: 'Trial 1',
                        backgroundColor: 'rgba(133, 17, 75, 0.2)',
                        pointBackgroundColor: 'rgb(133, 17, 75)',
                        data: [
                            fakeData.large,
                            fakeData.small,
                            fakeData.medium
                        ]
                    },
                    {
                        label: 'Trial 2',
                        backgroundColor: 'rgba(0, 31, 62, 0.2)',
                        pointBackgroundColor: 'rgb(0, 31, 62)',
                        data: [
                            fakeData.small,
                            fakeData.medium,
                            fakeData.large
                        ]
                    },
                    {
                        label: 'Trial 3',
                        backgroundColor: 'rgba(177, 13, 201, 0.2)',
                        pointBackgroundColor: 'rgb(177, 13, 201)',
                        data: [
                            fakeData.medium,
                            fakeData.large,
                            fakeData.small
                        ]
                    }
                ]
            })
        });
    });
}

module.exports = dashboardView;
