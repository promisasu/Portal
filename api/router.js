'use strict';

const Joi = require('joi');
const checkSurveys = require('./handler/check-surveys');
const getSurvey = require('./handler/get-survey');

module.exports = [
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
