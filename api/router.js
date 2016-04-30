'use strict';

const Joi = require('joi');

const checkSurveys = require('./handler/check-surveys');
const getSurvey = require('./handler/get-survey');
const submitSurvey = require('./handler/submit-survey');
const surveyResultsLogger = require('./handler/survey-results-logger');
const maxBodyPainIntensity = 10;
const minBodyPainIntensity = 0;

module.exports = [
    {
        method: 'GET',
        path: '/check_surveys',
        handler: checkSurveys,
        config: {
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
        handler: surveyResultsLogger,
        config: {
            validate: {
                payload: {
                    loggerResults: Joi.array().items(
                        Joi.object().keys({
                            eventName: Joi
                                .string(),
                            metaData: Joi.object().keys({
                                pin: Joi
                                    .number()
                                    .integer()
                                    .positive(),
                                sid: Joi
                                    .number()
                                    .integer()
                                    .positive(),
                                qid: Joi
                                    .number()
                                    .integer()
                                    .positive(),
                                aid: Joi
                                    .alternatives()
                                    .try(
                                        Joi
                                        .number()
                                        .integer()
                                        .positive(),
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
                            }),
                            startTime: Joi
                                .date()
                                .format('x')
                        })
                    )
                }
            }
        }
    }
];
