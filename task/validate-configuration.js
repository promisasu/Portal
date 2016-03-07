'use strict';

/**
 * @module task/validate-configuration
 * Checks that projects's `config.json` is valid.
 */

const Joi = require('joi');
const configuration = require('../config.json');
const schema = Joi
    .object()
    .keys({
        api: {
            hostname: Joi
                .string()
                .hostname(),
            port: Joi
                .number()
                .integer()
                .positive()
        },
        dashboard: {
            hostname: Joi
                .string()
                .hostname(),
            port: Joi
                .number()
                .integer()
                .positive()
        },
        database: {
            dialect: Joi
                .valid(['mysql', 'mariadb']),
            hostname: Joi
                .string()
                .hostname(),
            name: Joi
                .string()
                .token(),
            password: Joi
                .string(),
            salt: Joi
                .string(),
            username: Joi
                .string()
        },
        environment: Joi
            .string()
            .lowercase()
            .token()
    })
    .assert(
        'api.port',
        Joi.invalid(Joi.ref('dashboard.port')),
        'assert "api.port" is different from "dashboard.port"'
    );
const options = {
    convert: false,
    presence: 'required'
};

Joi.validate(configuration, schema, options, (err) => {
    if (err) {
        console.error(err.details);
    } else {
        console.log('Configuration is valid');
    }
});
