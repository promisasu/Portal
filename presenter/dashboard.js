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
                labels: ['Compliant', 'Semicompliant', 'Noncompliant'],
                datasets: [
                    {
                        label: 'Trial 1',
                        fillColor: 'rgba(133, 17, 75, 0.2)',
                        strokeColor: 'rgb(133, 17, 75)',
                        pointColor: 'rgb(133, 17, 75)',
                        data: [100, 10, 50]
                    },
                    {
                        label: 'Trial 2',
                        fillColor: 'rgba(0, 31, 62, 0.2)',
                        strokeColor: 'rgb(0, 31, 62)',
                        pointColor: 'rgb(0, 31, 62)',
                        data: [10, 50, 100]
                    },
                    {
                        label: 'Trial 3',
                        fillColor: 'rgba(177, 13, 201, 0.2)',
                        strokeColor: 'rgb(177, 13, 201)',
                        pointColor: 'rgb(177, 13, 201)',
                        data: [50, 100, 10]
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

    return {
        id: trial.id,
        name: trial.name,
        start: startDate.format('L'),
        end: endDate.format('L'),
        duration: startDate.to(endDate, true),
        // TODO: Currently fake data, make this live data
        patientCount: Math.floor(Math.random() * 900 + 100),
        noncompliantCount: Math.floor(Math.random() * 100),
        status: status
    };
}
