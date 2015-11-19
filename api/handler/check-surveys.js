/* eslint max-nested-callbacks: [2, 3]  */
'use strict';

/**
 * @module api/handler/check-surveys
 */

const database = require('../../model');
const _ = require('lodash');
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
    let currentPatient;
    const currentDate = moment();
    const surveyCompletedStatus = 0;

    patient.find({
        where: {
            pin: request.query.userPIN
        }
    }).then((patient) => {
        return new Promise((resolve, reject) => {
            if (patient) {
                if (moment() > patient.dateStarted && moment() < patient.dateCompleted) {
                    currentPatient = patient;
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
                FROM survey_instance si
                JOIN patient pa
                ON si.patientId = pa.id
                JOIN survey_template st
                ON si.surveyTemplateId = st.id
                WHERE pa.pin = ?
                AND si.startTime <= ?
                AND si.endTime > ?
                AND si.surveyInstanceCompleted = ?
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        currentPatient.pin,
                        currentDate.toISOString(),
                        currentDate.toISOString(),
                        surveyCompletedStatus
                    ]
                }
            )
            .then((surveys) => {
                reply({
                    message: 'Success',
                    surveys: _.map(surveys, processSurveys)
                });
            });
        });
    })
    .catch((err) => {
        reply(boom.badRequest(err));
    });
}

module.exports = checkSurveys;
