'use strict';

const dashboardPresenter = require('./presenter/dashboard');
const trialPresenter = require('./presenter/trial');
const patientPresenter = require('./presenter/patient');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: dashboardPresenter
    },
    {
        method: 'GET',
        path: '/trial/{id}',
        handler: trialPresenter
    },
    {
        method: 'GET',
        path: '/trial/{id}/patient/{pid}',
        handler: patientPresenter
    }
];
