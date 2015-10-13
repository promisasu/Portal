'use strict';

/**
 * @module presenter/dashboard
 */

const database = require('../model');
const _ = require('lodash');
const moment = require('moment');

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
            trials: trialData
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

    return {
        id: trial.id,
        title: trial.name,
        start: moment(trial.startAt).format('L'),
        duration: moment(trial.startAt).to(moment(trial.endAt), true),
        // TODO: Currently fake data, make this live data
        patientCount: Math.floor(Math.random() * 900 + 100),
        noncompliantCount: Math.floor(Math.random() * 100)
    };
}
