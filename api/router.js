'use strict';

const Joi = require('joi');

const checkSurveys = require('./handler/check-surveys');
const getSurvey = require('./handler/get-survey');
const submitSurvey = require('./handler/submit-survey');
const surveyLogger = require('./handler/survey-logger');
const maxBodyPainIntensity = 10;
const minBodyPainIntensity = 0;

module.exports = [
    {
        method: 'GET',
        path: '/check_surveys',
        handler: checkSurveys,
        config: {
            cors: true,
            validate: {
                query: {
                    userPIN: Joi
                        .number()
                        .integer()
                        .positive()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/get_survey',
        handler: getSurvey,
        config: {
            cors: true,
            validate: {
                query: {
                    surveyInstanceID: Joi
                        .number()
                        .integer()
                        .positive()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/submit_survey',
        handler: submitSurvey,
        config: {
            cors: true,
            validate: {
                payload: {
                    surveyInstanceID: Joi
                        .number()
                        .integer()
                        .positive(),
                    timeStamp: Joi
                        .date()
                        .format('x'),
                    surveyResults: Joi.array().items(
                        Joi.object().keys({
                            quesID: Joi
                                .number()
                                .integer()
                                .positive(),
                            selectedOptions: Joi.array().items(
                                Joi
                                    .number()
                                    .integer()
                                    .positive()
                                    .empty('')
                            ),
                            bodyPain: Joi.array().items(
                                Joi.object().keys({
                                    location: Joi
                                        .string()
                                        .lowercase(),
                                    intensity: Joi
                                        .number()
                                        .integer()
                                        .min(minBodyPainIntensity)
                                        .max(maxBodyPainIntensity)
                                })
                            )
                        })
                    )
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/survey_logger',
        handler: surveyLogger,
        config: {
            cors: true,
            validate: {
                payload: {
                    surveyInstanceID: Joi
                        .number()
                        .integer()
                        .positive(),
                    timeStamp: Joi
                        .date()
                        .format('x'),
                    surveyResponseLog: Joi.array().items(
                        Joi.object().keys({
                            quesID: Joi
                                .number()
                                .integer()
                                .positive(),
                            ansTimestamp: Joi
                                .date()
                                .format('x'),
                            prevTimeStamp: Joi
                                .date()
                                .format('x'),
                            nextTimeStamp: Joi
                                .date()
                                .format('x')
                        })
                    )
                }
            }
        }
    }
];
