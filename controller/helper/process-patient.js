'use strict';

/**
 * @module controller/helper/process-patient
 */

const moment = require('moment');

/**
 * Takes in a Patient model and processes it into human readable format
 * @param {Trial} currentPatient - a single Patient object
 * @returns {Object} processed Patient
 */
function processPatient (currentPatient) {
    const patient = currentPatient.dataValues;

    return {
        pin: patient.pin,
        // TODO add real data
        status: null,
        statusType: null,
        stage: null,
        lastTaken: null,
        totalMissed: null,
        consecutiveMissed: null
    };
}

module.exports = processPatient;
