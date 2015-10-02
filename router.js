'use strict';

const welcomePresenter = require('./presenter/welcome');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: welcomePresenter
    }
];
