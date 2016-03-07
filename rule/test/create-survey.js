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

test('create a survey instance', () => {
    const patientPin = 2001;
    const surveyTemplate = 1;
    const startDate = new Date();
    const openFor = 7;
    const openUnit = 'day';

    return createSurvey(patientPin, surveyTemplate, startDate, openFor, openUnit);
});

test('create a survey instance in an existing transaction', () => {
    const patientPin = 2001;
    const surveyTemplate = 1;
    const startDate = new Date();
    const openFor = 7;
    const openUnit = 'day';
    let transaction = null;

    return database
        .sequelize
        .transaction()
        .then((newTransaction) => {
            transaction = newTransaction;

            return createSurvey(patientPin, surveyTemplate, startDate, openFor, openUnit, newTransaction);
        })
        .then(() => {
            return transaction.commit();
        })
        .catch((err) => {
            transaction.rollback();
            throw err;
        });
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
