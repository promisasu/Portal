'use strict';

/**
 * @module controller/helper/process-patient
 */

const moment = require('moment');
const statuses = ['Compliant', 'Semicompliant', 'Noncompliant'];
const statusTypes = ['success', 'warning', 'danger'];
const fakeData = {
    numberOfStatus: 3,
    numberOfStage: 3,
    maxMissed: 10,
    maxConsecutiveMissed: 3,
    day: 1,
    month: 1,
    year: 2014
};

/**
 * Takes in a Patient model and processes it into human readable format
 * @param {Trial} currentPatient - a single Patient object
 * @returns {Object} processed Patient
 */
function processPatient (currentPatient) {
    const patient = currentPatient.dataValues;

    // TODO replace randomly generated data with real data
    const randomStatus = Math.floor(Math.random() * fakeData.numberOfStatus);
    const randomStage = Math.floor(Math.random() * fakeData.numberOfStage);
    const randomMissed = Math.floor(Math.random() * fakeData.maxMissed);
    const randomConsecutiveMissed = Math.floor(randomMissed / fakeData.maxConsecutiveMissed);
    const startDate = new Date(fakeData.month, fakeData.day, fakeData.year);
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
