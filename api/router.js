'use strict';
const Joi = require('joi');
const listTrials = require('./handler/list-trials');
const checkSurveys = require('./handler/checkSurveys');

module.exports = [
    {
        method: 'GET',
        path: '/api/trials',
        handler: listTrials
    },
    {
        method: 'GET',
        path: '/api/check_surveys',
        handler: checkSurveys,
        config: {
            validate: {
                query: {
                    userPIN: Joi.number().integer()
                }
            }
        }
    }
];
