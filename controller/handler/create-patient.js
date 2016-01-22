'use strict';

/**
 * @module controller/handler/create-patient
 */

const boom = require('boom');
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
    const stage = database.sequelize.model('stage');
    let transaction = null;
    let newPatient = null;
    let pin = null;

    database.sequelize.transaction()
    .then((currentTransaction) => {
        transaction = currentTransaction;
        // Get Trial the patient will be added to
        return trial.findById(request.payload.trialId, {transaction});
    })

    // Get next availible Patient Pin
    .then((tempTrial) => {
        const currentTrial = tempTrial;

        pin = currentTrial.id * trialOffset + currentTrial.patientPinCounter;
        currentTrial.patientPinCounter += 1;
        return currentTrial.save({transaction});
    })
    // Create the new Patient
    .then(() => {
        return patient.create({pin}, {transaction});
    })
    // Get stage that patient belongs to
    .then((tempPatient) => {
        newPatient = tempPatient;
        return stage.findById(request.payload.stageId, {transaction});
    })
    // Add patient to stage
    .then((currentStage) => {
        return currentStage.addPatient(newPatient, {transaction});
    })
    // Show the new Patient
    .then(() => {
        transaction.commit();
        reply.redirect(`/patient/${newPatient.pin}`);
    })
    .catch(() => {
        transaction.rollback();
        reply(boom.badRequest('Trial or Stage does not exist'));
    });
}

module.exports = createPatient;
