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
    const statuses = ['Compliant', 'Semicompliant', 'Noncompliant'];
    const statusTypes = ['success', 'warning', 'danger'];

    // TODO replace randomly generated data with real data
    const randomStatus = Math.floor(Math.random() * 3);
    const randomStage = Math.floor(Math.random() * 3);
    const randomMissed = Math.floor(Math.random() * 10);
    const randomConsecutiveMissed = Math.floor(randomMissed / 3);
    const startDate = new Date(1, 1, 2014);
    const todayDate = new Date();
    const randomDate = new Date(startDate.getTime() + Math.random() * (todayDate.getTime() - startDate.getTime()));
    const randomDateDisplay = moment(randomDate).format('L');

    return {
        pin: patient.pin,
        status: statuses[randomStatus],
        statusType: statusTypes[randomStatus],
        stage: randomStage,
        lastTaken: randomDateDisplay,
        totalMissed: randomMissed,
        consecutiveMissed: randomConsecutiveMissed
    };
}

module.exports = processPatient;
