'use strict';

/**
 * @module api/handler/check-surveys
 */

const database = require('../../model');
const processSurveys = require('../helper/process-surveys');
const boom = require('boom');
const moment = require('moment');

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

    patient.find({
        where: {
            pin: request.query.userPIN
        }
    }).then((resultPatient) => {
        return new Promise((resolve, reject) => {
            if (resultPatient) {
                if (moment() > resultPatient.dateStarted && moment() < resultPatient.dateCompleted) {
                    currentPatient = resultPatient;
                    resolve();
                } else {
                    reject('Your PIN is not active');
                }
            } else {
                reject('The PIN is invalid');
            }
        })
        .then(() => {
            database.sequelize.query(
                `
                SELECT *, si.id
                FROM survey_instance AS si
                JOIN patient AS pa
                ON si.patientId = pa.id
                JOIN survey_template AS st
                ON si.surveyTemplateId = st.id
                WHERE pa.pin = ?
                AND ((si.startTime <= ?
                AND si.endTime > ?)
                OR (si.startTime > ?))
                AND (si.state = 'pending'
                OR si.state = 'in progress')
                ORDER BY si.startTime
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        currentPatient.pin,
                        currentDate.toISOString(),
                        currentDate.toISOString(),
                        currentDate.toISOString()
                    ]
                }
            )
            .then((surveys) => {
                reply({
                    message: 'Success',
                    surveys: surveys.map(processSurveys)
                });
            });
        });
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest(err));
    });
}

module.exports = checkSurveys;
