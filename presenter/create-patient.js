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
    .then((data) => {
        newPatient = data[0];
        const currentTrial = data[1];
        const temp = addPadding(newPatient.id.toString(), newPatient.id.toString().length);
        const pin = currentTrial.id.toString().concat(temp);

        newPatient.pin = pin;
        newPatient.save();
        return currentTrial.addPatient(newPatient);
    })
    .then(() => {
        reply.redirect(`/patient/${newPatient.id}`);
    });
};

/**
* Converts the patient.id into temporary patient.pin with zero padding making it 3 digit pin.
* @function addPadding
* @param {pin} pin - patient.id
* @param {len} len - lenght of patient.id
* @returns {pin} returns the patient temporary pin
*/
function addPadding (pin, len) {
    const padding = '0';

    while (len < 3) {
        pin = padding + pin;
        len++;
    }
    return pin;
}
