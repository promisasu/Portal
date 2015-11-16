'use strict';

const database = require('../../model');
const _ = require('lodash');
const processSurveys = require('../helper/process-surveys');

module.exports = function (request, reply) {
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
};
