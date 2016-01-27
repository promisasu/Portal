'use strict';

const test = require('ava');
const config = require('../../config.json').database;

config.name = 'prp_test';

const database = require('../../model');
const createSurvey = require('../task/create-survey');

database.setup(config);

test.before('create a patient', () => {
    const patient = database.sequelize.model('patient');

    return patient.create({
        pin: 2001,
        startDate: new Date(),
        endDate: new Date()
    });
});

test('create can create a survey instance', () => {
    const patientPin = 2001;
    const surveyTemplate = 1;
    const opensIn = 0;
    const openFor = 7;
    const openUnit = 'day';

    return createSurvey(patientPin, surveyTemplate, opensIn, openFor, openUnit);
});

test.after('delete temporary patient', () => {
    const patient = database.sequelize.model('patient');

    return patient.findOne({
        where: {
            pin: 2001
        }
    })
    .then((tempPatient) => {
        tempPatient.destroy();
    });
});
