'use strict';

const Joi = require('joi');

const createTrial = require('./presenter/create-trial');
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
        method: 'POST',
        path: '/trial',
        handler: createTrial,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(3),
                    description: Joi.string().empty(''),
                    startAt: Joi.date(),
                    endAt: Joi.date()
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
        method: 'GET',
        path: '/patient/{id}',
        handler: patientPresenter,
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
