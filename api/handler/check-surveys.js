'use strict';

/**
 * @module api/handler/check-surveys
 */

const database = require('../../model');
const processSurveys = require('../helper/process-surveys');
const boom = require('boom');

/**
 * Checks for availible Surveys for a Patient to take
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function checkSurveys (request, reply) {
    const patient = database.sequelize.model('patient');
    const currentDate = new Date();
    let currentPatient = null;

    // find patient
    patient
    .find({
        where: {
            pin: request.query.userPIN
        }
    })
    // check that patient is valid and is currently active
    .then((resultPatient) => {
        if (!resultPatient) {
            throw new Error('The PIN is invalid');
        }
        if (currentDate < resultPatient.dateStarted || currentDate > resultPatient.dateCompleted) {
            throw new Error('Your PIN is not active');
        }
        currentPatient = resultPatient;

        return null;
    })
    // gather all pending and in progress surveys for a patient
    .then(() => {
        return database.sequelize.query(
            `
            SELECT *, si.id
            FROM survey_instance AS si
            JOIN active_patients AS pa
            ON si.patientId = pa.id
            JOIN survey_template AS st
            ON si.surveyTemplateId = st.id
            WHERE pa.pin = ?
            AND ? BETWEEN si.startTime AND si.endTime
            AND (
                si.state = 'pending'
                OR si.state = 'in progress'
            )
            ORDER BY si.startTime
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    currentPatient.pin,
                    currentDate.toISOString()
                ]
            }
        );
    })
    .then((surveys) => {
        return reply({
            message: 'Success',
            surveys: surveys.map(processSurveys)
        });
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest(err));
    });
}

module.exports = checkSurveys;
