'use strict';

/**
 * @module presenter/create-patient
 */

const database = require('../model');

/**
 * Creates a new Patient
 * @function createPatient
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
module.exports = function (request, reply) {
    const patient = database.sequelize.model('patient');
    const trial = database.sequelize.model('trial');
    let newPatient;

    Promise.all([
        patient.create({}),
        trial.findById(request.payload.trialId)
    ])
    .then(function (data) {
        newPatient = data[0];
        const currentTrial = data[1];

        return currentTrial.addPatient(newPatient);
    })
    .then(function () {
        reply.redirect('/patient/' + newPatient.id);
    });
};
