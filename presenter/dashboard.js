'use strict';

/**
 * @module presenter/dashboard
 */

const _ = require('lodash');
const moment = require('moment');

const database = require('../model');

/**
 * A dashboard view with overview of all trials and patients.
 * @function dashboard
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.findAll().then(function (trials) {
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
};

/**
 * Takes in a Trial model and processes them into human readable format
 * @param {Trial} currentTrial - a single Trial object
 * @returns {Object} processed Trial
 */
function processTrial (currentTrial) {
    const trial = currentTrial.dataValues;
    const startDate = moment(trial.startAt);
    const endDate = moment(trial.endAt);
    const statuses = ['Pending', 'Upcoming', 'In Progress', 'Completed'];
    const status = statuses[Math.floor(Math.random() * 4)];
    // TODO: Currently fake data, make this live data
    const targetCount = moment(trial.targetCount);
    const recruitedCount = targetCount - 153;
    const activeCount = recruitedCount - 23;
    const compliantCount = activeCount - 67;

    return {
        id: trial.id,
        name: trial.name,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: endDate.format('L'),
        targetCount: targetCount,
        recruitedCount: recruitedCount,
        activeCount: activeCount,
        compliantCount: compliantCount,
        recruitedPercent: (recruitedCount / targetCount * 100).toFixed(2),
        unrecruitedPercent: (100 - recruitedCount / targetCount * 100).toFixed(2),
        activePercent: (activeCount / recruitedCount * 100).toFixed(2),
        completedPercent: (100 - activeCount / recruitedCount * 100).toFixed(2),
        compliantPercent: (compliantCount / activeCount * 100).toFixed(2),
        noncompliantPercent: (100 - compliantCount / activeCount * 100).toFixed(2),
        status: status
    };
}
