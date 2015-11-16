/* eslint max-nested-callbacks: [2, 2] */
'use strict';

/**
 * @module presenter/trial
 */

const moment = require('moment');
const _ = require('lodash');
const color = require('colors.css');

const database = require('../../model');
const processPatient = require('../helper/process-patient');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.findById(request.params.id).then((currentTrial) => {
        currentTrial.getPatients()
        .then((patients) => {
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
    })
    .catch(() => {
        reply.redirect('/404');
    });
};

/**
 * Takes in a Trial model and processes it into human readable format
 * @param {Trial} currentTrial - a single Trial object
 * @returns {Object} processed Trial
 */
function processTrial (currentTrial) {
    const trial = currentTrial.dataValues;
    const startDate = moment(trial.IRBStart);
    const endDate = moment(trial.IRBEnd);

    return {
        id: trial.id,
        name: trial.name,
        description: trial.description,
        IRBID: trial.IRBID,
        start: startDate.format('L'),
        end: endDate.format('L'),
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
