'use strict';

/**
 * @module api/handler/check-surveys
 */

const database = require('../../model');
const _ = require('lodash');
const processSurveys = require('../helper/process-surveys');

/**
 * Checks for availible Surveys for a Patient to take
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function checkSurveys (request, reply) {
    console.log(request.query.userPIN);

    database.sequelize.query(
        `
        SELECT *
        FROM survey_instance AS si
        JOIN patient pa
        ON si.patientId = pa.id
        JOIN survey_template st
        ON si.surveyTemplateId = st.id
        WHERE pa.pin = ?
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                request.query.userPIN
            ]
        }
    )
    .then((surveys) => {
        reply({
            message: 'Success',
            surveys: _.map(surveys, processSurveys)
        });
    });
}

module.exports = checkSurveys;
