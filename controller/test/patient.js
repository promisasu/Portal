'use strict';

const test = require('ava');
const config = require('../../config.json');

config.database.name = 'prp_test';
config.dashboard.authentication = false;

const server = require('../server')(config);
const database = require('../../model');
const httpBadRequest = 400;
const httpOkay = 200;

database.setup(config.database);

test.before('create a temporary patient', () => {
    const patient = database.sequelize.model('patient');

    return patient.create({
        pin: 1001,
        startDate: new Date(),
        endDate: new Date()
    });
});

test.cb('invalid patient pin errors', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/patient/breaks'
        },
        (response) => {
            t.is(response.statusCode, httpBadRequest);
            t.end();
        }
    );
});

test.cb('patient with a valid pin loads', (t) => {
    server.inject(
        {
            method: 'GET',
            url: '/patient/1001'
        },
        (response) => {
            t.is(response.statusCode, httpOkay);
            t.end();
        }
    );
});

test.after('delete temporary patient', () => {
    const patient = database.sequelize.model('patient');

    return patient.findOne({
        where: {
            pin: 1001
        }
    })
    .then((tempPatient) => {
        tempPatient.destroy();
    });
});
