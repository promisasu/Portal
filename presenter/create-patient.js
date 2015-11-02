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
        const temp = addPadding(newPatient.id.toString(),newPatient.id.toString().length);
        const pin = currentTrial.id.toString().concat(temp);
        newPatient.pin = pin;
        newPatient.save();
        return currentTrial.addPatient(newPatient);
    })
    .then(function () {
        reply.redirect('/patient/' + newPatient.id);
    });
};

function addPadding(pin, len){
    const padding = "0";
    while(len < 3){
        console.log("Inside while loop");
        pin = padding + pin;
        len++;
    }
    return pin;
}
