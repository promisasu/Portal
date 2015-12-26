'use strict';

/**
 * @module controller/handler/create-patient
 */

const database = require('../../model');
const trialOffset = 1000;

/**
 * Creates a new Patient
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
function createPatient (request, reply) {
    const patient = database.sequelize.model('patient');
    const trial = database.sequelize.model('trial');
    let currentTrial = null;
    let newPatient = null;
    let pin = null;

    // Get Trial the patient will be added to
    trial.findById(request.payload.trialId)
    // Get next availible Patient Pin
    .then((tempTrial) => {
        currentTrial = tempTrial;

        pin = currentTrial.id * trialOffset + currentTrial.patientPinCounter;
        currentTrial.patientPinCounter += 1;
        return currentTrial.save();
    })
    // Create the new Patient
    .then(() => {
        return patient.create({pin});
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
}

module.exports = createPatient;
