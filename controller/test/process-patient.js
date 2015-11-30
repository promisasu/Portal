'use strict';

const test = require('ava');
const joi = require('joi');
const processPatient = require('../helper/process-patient');

test.cb('patient data has correct format', (t) => {
    const example = {
        dataValues: {
            pin: 1
        }
    };
    const output = processPatient(example);
    const schema = joi.object().keys({
        pin: joi.number().integer(),
        status: joi.string(),
        statusType: joi.string(),
        stage: joi.number().integer(),
        lastTaken: joi.date(),
        totalMissed: joi.number().integer(),
        consecutiveMissed: joi.number().integer()
    });

    joi.validate(output, schema, (err) => {
        t.ifError(err);
        t.end();
    });
});
