/* eslint max-nested-callbacks: [2, 2] */
'use strict';

/**
 * @module controller/handler/trial
 */

const _ = require('lodash');
const color = require('colors.css');

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const fakeData = {
    small: 10,
    medium: 50,
    large: 100
};

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
                    datasets: [
                        {
                            data: [
                                fakeData.large,
                                fakeData.medium,
                                fakeData.small
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
}

module.exports = trialView;
