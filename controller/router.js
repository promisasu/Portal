'use strict';

const Joi = require('joi');
const moment = require('moment');

const createTrial = require('./handler/create-trial');
const createPatient = require('./handler/create-patient');
const dashboardPresenter = require('./handler/dashboard');
const trialPresenter = require('./handler/trial');
const patientPresenter = require('./handler/patient');
const surveyPresenter = require('./handler/survey');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: dashboardPresenter
    },
    {
        method: 'POST',
        path: '/trial',
        handler: createTrial,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(3),
                    description: Joi.string(),
                    IRBID: Joi.string().min(4),
                    IRBStart: Joi.date().min(moment().format('YYYY-MM-DD')),
                    IRBEnd: Joi.date().min(moment().format('YYYY-MM-DD')),
                    targetCount: Joi.number().integer().min(0)
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
                    trialId: Joi.number().integer()
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
    },
    {
        method: 'GET',
        path: '/404',
        handler: {
            view: {
                template: '404',
                context: {
                    title: 'Not Found'
                }
            }
        }
    }
];
