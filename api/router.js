'use strict';

const Joi = require('joi');
const listTrials = require('./handler/list-trials');
const checkSurveys = require('./handler/checkSurveys');
const getSurvey = require('./handler/getSurvey');

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
    },
    {
        method: 'GET',
        path: '/api/get_survey',
        handler: getSurvey,
        config: {
            validate: {
                query: {
                    surveyInstanceID: Joi.number().integer()
                }
            }
        }
    }
];
