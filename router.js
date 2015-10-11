'use strict';

const dashboardPresenter = require('./presenter/dashboard');
const trialPresenter = require('./presenter/trial');

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
    }
];
