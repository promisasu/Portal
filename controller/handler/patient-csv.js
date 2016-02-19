'use strict';

/**
 * @module controller/handler/patient-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');

const configuration = [
    {
        label: 'patient pin',
        key: 'pin',
        default: 'DNE'
    },
    {
        label: 'survey name',
        key: 'name'
    },
    {
        label: 'unique survey id',
        key: 'id'
    },
    {
        label: 'question',
        key: 'questionText'
    },
    {
        label: 'question option',
        key: 'optionText'
    },
    {
        label: 'selected answer',
        key: 'answered',
        default: 'false'
    }
];

/**
 * Create a Comma Seperate Value export of a single patient's data.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientCSV (request, reply) {
    Promise
    .all([
        // All of the responses for the patient's surveys
        database.sequelize.query(
            `
            SELECT si.id AS surveyId, qo.id AS optionId
            FROM patient AS pa
            JOIN survey_instance AS si
            ON si.patientId = pa.id
            JOIN question_result AS qr
            ON qr.surveyInstanceId = si.id
            JOIN question_option AS qo
            ON qo.id = qr.questionOptionId
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.id
                ]
            }
        ),
        // All patient data, survey data and question data
        // both answered and unanswered
        database.sequelize.query(
            `
            SELECT *, si.id, qt.id AS questionId, qo.id AS optionId
            FROM patient AS pa
            JOIN survey_instance AS si
            ON si.patientId = pa.id
            JOIN survey_template AS st
            ON st.id = si.surveyTemplateId
            JOIN join_surveys_and_questions AS jsq
            ON jsq.surveyTemplateId = st.id
            JOIN question_template AS qt
            ON qt.id = jsq.questionTemplateId
            JOIN question_option AS qo
            ON qo.questionTemplateId = qt.id
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        )
    ])
    .then((data) => {
        const allOptionsWithAnswers = data[1].map((questionOption) => {
            // check if question has been answered
            const answered = data[0].find((questionAnswered) => {
                return questionOption.id === questionAnswered.surveyId
                    && questionOption.optionId === questionAnswered.optionId;
            });

            // add answered attribute to data
            questionOption.answered = Boolean(answered);

            // send back updated data
            return questionOption;
        });

        return convertJsonToCsv(allOptionsWithAnswers, configuration);
    })
    .then((csv) => {
        reply(csv).type('text/csv');
    })
    .catch((err) => {
        console.error(err);
        reply(boom.notFound('patient data not found'));
    });
}

module.exports = patientCSV;