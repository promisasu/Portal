'use strict';

/**
 * @module controller/helper/process-patient
 */

/**
 * Takes in a Patient model and processes it into human readable format
 * @param {Trial} patient - a single Patient object
 * @returns {Object} processed Patient
 */
function processPatient (patient) {
    return {
        pin: patient.pin,
        stage: patient.stage,
        // TODO add real data
        status: null,
        statusType: null,
        lastTaken: null,
        totalMissed: null,
        consecutiveMissed: null
    };
}

module.exports = processPatient;
