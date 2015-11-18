'use strict';

/**
 * @module controller/handler/dashboard
 */

const _ = require('lodash');
const processTrial = require('../helper/process-trial');

const database = require('../../model');

/**
 * A dashboard view with overview of all trials and patients.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function dashboard (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.findAll().then((trials) => {
        // Process data into format expected in view
        const trialData = _.map(trials, processTrial);

        // Display view
        reply.view('dashboard', {
            title: 'Pain Reporting Portal',
            status: {
                patientCount: 2032,
                riskCount: 52,
                noncompliantCount: 11
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
                            100,
                            10,
                            50
                        ]
                    },
                    {
                        label: 'Trial 2',
                        backgroundColor: 'rgba(0, 31, 62, 0.2)',
                        pointBackgroundColor: 'rgb(0, 31, 62)',
                        data: [
                            10,
                            50,
                            100
                        ]
                    },
                    {
                        label: 'Trial 3',
                        backgroundColor: 'rgba(177, 13, 201, 0.2)',
                        pointBackgroundColor: 'rgb(177, 13, 201)',
                        data: [
                            50,
                            100,
                            10
                        ]
                    }
                ]
            })
        });
    });
}

module.exports = dashboard;
