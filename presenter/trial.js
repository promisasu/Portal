/* eslint max-nested-callbacks: [2, 2] */
'use strict';

/**
 * @module presenter/trial
 */

const moment = require('moment');
const _ = require('lodash');
const color = require('colors.css');

const database = require('../model');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.findById(request.params.id).then(function (currentTrial) {
        if (currentTrial === null) {
            reply.redirect('/404');
        } else {
            currentTrial.getPatients()
            .then(function (patients) {
                reply.view('trial', {
                    title: 'Pain Reporting Portal',
                    trial: processTrial(currentTrial),
                    graphData: JSON.stringify({
                        datasets: [
                            {
                                data: [
                                    100,
                                    50,
                                    10
                                ],
                                backgroundColor: [
                                    color.green,
                                    color.yellow,
                                    color.red
                                ]
                            }
                        ],
                        labels: [
                            'Compliant',
                            'Semicompliant',
                            'Noncompliant'
                        ]
                    }),
                    patients: _.map(patients, processPatient)
                });
            });
        }
    });
};

/**
 * Takes in a Trial model and processes it into human readable format
 * @param {Trial} currentTrial - a single Trial object
 * @returns {Object} processed Trial
 */
function processTrial (currentTrial) {
    const trial = currentTrial.dataValues;
    const startDate = moment(trial.startAt);
    const endDate = moment(trial.endAt);

    return {

        id: trial.id,
        name: trial.name,
        description: trial.description,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: startDate.format('L'),
         // TODO: Currently fake data, make this live data
        duration: startDate.to(endDate, true),
        patientCount: Math.floor(Math.random() * 900 + 100),
        noncompliantCount: Math.floor(Math.random() * 100),
        recruitedNumberOfPatients: Math.floor(Math.random() * 200),
        activePatients: Math.floor(Math.random() * 50),
        completedPatients: Math.floor(Math.random() * 40),
        compliantCount: Math.floor(Math.random() * 80)
    };
}

/**
 * Takes in a Patient model and processes it into human readable format
 * @param {Trial} currentPatient - a single Patient object
 * @returns {Object} processed Patient
 */
function processPatient (currentPatient) {
    const patient = currentPatient.dataValues;
    const statuses = ['Compliant', 'Semicompliant', 'Noncompliant'];
    const statusTypes = ['success', 'warning', 'danger'];

    // TODO replace randomly generated data with real data
    const randomStatus = Math.floor(Math.random() * 3);
    const randomStage = Math.floor(Math.random() * 3);
    const randomMissed = Math.floor(Math.random() * 10);
    const randomConsecutiveMissed = Math.floor(randomMissed / 3);
    const startDate = new Date(1, 1, 2014);
    const todayDate = new Date();
    const randomDate = new Date(startDate.getTime() + Math.random() * (todayDate.getTime() - startDate.getTime()));
    const randomDateDisplay = moment(randomDate).format('L');

    return {
        id: patient.id,
        status: statuses[randomStatus],
        statusType: statusTypes[randomStatus],
        stage: randomStage,
        lastTaken: randomDateDisplay,
        totalMissed: randomMissed,
        consecutiveMissed: randomConsecutiveMissed
    };
}
