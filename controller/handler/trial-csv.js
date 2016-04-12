'use strict';

/**
 * @module controller/handler/trial-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');
const deduplicate = require('../helper/deduplicate');
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
        label: 'unique question id',
        key: 'questionId'
    },
    {
        label: 'question',
        key: 'questionText'
    },
    {
        label: 'question option',
        key: 'optionText'
    }
];

/**
 * Create a Comma Seperate Value export of a single patient's data.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialCSV (request, reply) {
    database.sequelize.query(
        `
        SELECT pa.pin, st.name, si.id, qt.id AS questionId, qt.questionText, qo.id AS optionId, qo.optionText
        FROM trial AS tr
        JOIN stage AS stage
        ON stage.trialId = tr.id
        JOIN patient AS pa
        ON pa.stageId = stage.id
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
        JOIN question_result AS qr
        ON qr.surveyInstanceId = si.id
        AND qr.questionOptionId = qo.id
        WHERE tr.id = ?
                and si.state = 'completed'
                ORDER BY si.id, jsq.questionOrder, qo.order
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                request.params.id
            ]
        }
    )
    .then((optionsWithAnswers) => {
        const property = ['pin', 'name', 'id', 'questionText', 'questionId'];
        const uniqueAnswers = deduplicate(optionsWithAnswers, property);

        return convertJsonToCsv(uniqueAnswers, configuration);
    })
    .then((csv) => {
        return reply(csv).type('text/csv');
    })
    .catch((err) => {
        console.error(err);
        reply(boom.notFound('patient data not found'));
    });
}

module.exports = trialCSV;