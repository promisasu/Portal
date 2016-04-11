'use strict';

/**
 * @module controller/handler/create-patient
 */

const boom = require('boom');
const database = require('../../model');
const trialOffset = 1000;
const createSurvey = require('../helper/create-survey-instance');

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
    const joinStageSurveys = database.sequelize.model('join_stages_and_surveys');
    let transaction = null;
    let newPatient = null;
    let pin = null;

    database
    .sequelize
    .transaction()
    .then((newTransaction) => {
        transaction = newTransaction;

        // Get Trial the patient will be added to
        return trial.findById(request.payload.trialId, {transaction});
    })
    // Get next availible Patient Pin
    .then((currentTrial) => {
        pin = currentTrial.id * trialOffset + currentTrial.patientPinCounter;

        return currentTrial.increment({patientPinCounter: 1}, {transaction});
    })
    // Create the new Patient
    .then(() => {
        const dateStarted = request.payload.startDate;
        const dateCompleted = request.payload.endDate;

        return patient.create({pin, dateStarted, dateCompleted}, {transaction});
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
    // Collect the surveyTemplateId for the stage associated to the patient
    .then(() => {
        return joinStageSurveys.findOne(
            {
                where: {
                    stageId: request.payload.stageId,
                    stagePriority: 0
                },
                transaction
            }
        );
    })
    // Create first survey instance as per the surveyTemplateId for the patient
    .then((data) => {
        const startDate = request.payload.startDate;
        const openUnit = 'day';
        let openFor = null;

        if (data.rule === 'daily') {
            openFor = 1;
        } else {
            openFor = 2;
        }

        return createSurvey(
            pin,
            data.surveyTemplateId,
            startDate,
            openFor,
            openUnit,
            transaction
        );
    })
    // Commit the transaction
    .then(() => {
        return transaction.commit();
    })
    .then(() => {
        return reply.redirect(`/patient/${newPatient.pin}?newPatient=true`);
    })
    .catch((err) => {
        transaction.rollback();
        request.log('error', err);
        reply(boom.badRequest('Patient could not be created'));
    });
}

module.exports = createPatient;
