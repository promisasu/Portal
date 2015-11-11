'use strict';

/**
 * @module presenter/create-patient
 */

const database = require('../../model');

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
    let currentTrial;
    let newPatient;
    let pin;

    // Get Trial the patient will be added to
    trial.findById(request.payload.trialId)
    // Get next availible Patient Pin
    .then((tempTrial) => {
        currentTrial = tempTrial;

        pin = currentTrial.id * 1000 + currentTrial.patientPinCounter;
        currentTrial.patientPinCounter++;
        return currentTrial.save();
    })
    // Create the new Patient
    .then(() => {
        return patient.create({pin: pin});
    })
    // Link patient to Trial
    .then((tempPatient) => {
        newPatient = tempPatient;
        return currentTrial.addPatient(newPatient);
    })
    // Show the new Patient
    .then(() => {
        reply.redirect(`/patient/${newPatient.pin}`);
    });
};