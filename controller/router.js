'use strict';

const Joi = require('joi');
const moment = require('moment');

const createTrial = require('./handler/create-trial');
const createPatient = require('./handler/create-patient');
const dashboardPresenter = require('./handler/dashboard');
const trialPresenter = require('./handler/trial');
const patientPresenter = require('./handler/patient');
const surveyPresenter = require('./handler/survey');
const minimumNameLength = 3;
const minimumIrbLength = 4;
const mimimumTargetCount = 0;

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: dashboardPresenter
    },
    {
        method: 'GET',
        path: '/vendor/{param*}',
        handler: {
            directory: {
                path: 'bower_components'
            }
        }
    },
    {
        method: 'GET',
        path: '/static/style/{param*}',
        handler: {
            directory: {
                path: 'view/stylesheet'
            }
        }
    },
    {
        method: 'GET',
        path: '/static/script/{param*}',
        handler: {
            directory: {
                path: 'view/script'
            }
        }
    },
    {
        method: 'POST',
        path: '/trial',
        handler: createTrial,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(minimumNameLength),
                    description: Joi.string(),
                    IRBID: Joi.string().min(minimumIrbLength),
                    IRBStart: Joi.date().min(moment().format('YYYY-MM-DD')),
                    IRBEnd: Joi.date().min(moment().format('YYYY-MM-DD')),
                    targetCount: Joi.number().integer().min(mimimumTargetCount)
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/trial/{id}',
        handler: trialPresenter,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/patient',
        handler: createPatient,
        config: {
            validate: {
                payload: {
                    stageId: Joi.number().integer(),
                    trialId: Joi.number().integer(),
                    patStartDate: Joi.date().min(moment().format('YYYY-MM-DD')),
                    patEndDate: Joi.date().min(moment().format('YYYY-MM-DD'))
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/patient/{pin}',
        handler: patientPresenter,
        config: {
            validate: {
                params: {
                    pin: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/survey/{id}',
        handler: surveyPresenter,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer()
                }
            }
        }
    }
];
