'use strict';

const test = require('ava');
const joi = require('joi');
const processPatient = require('../helper/process-patient');

test.cb('patient data has correct format', (t) => {
    const example = {
        pin: 1,
        stage: 'test'
    };
    const output = processPatient(example);
    const schema = joi.object().keys({
        pin: joi.number().integer(),
        stage: joi.string()
    });

    joi.validate(output, schema, (err) => {
        t.ifError(err);
        t.end();
    });
});
