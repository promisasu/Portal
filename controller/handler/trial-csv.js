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
        label: 'Trial Name',
        key: 'trialName'
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
    },
    {
        label: 'Device Type',
        key: 'deviceType'
    },
    {
        label: 'Device Version',
        key: 'deviceVersion'
    },
    {
        label: 'Date Started',
        key: 'dateStarted'
    },
    {
        label: 'Date Completed',
        key: 'dateCompleted'
    }
];

/**
 * Create a Comma Seperate Value export of the data of all the patient's that are enrolled in a trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialCSV (request, reply) {
    database.sequelize.query(
        `
        SELECT tr.name AS trialName, pa.pin, pa.deviceType, pa.deviceVersion, pa.dateStarted, pa.dateCompleted, st.name,
        si.id, qt.id AS questionId, qt.questionText, qo.id AS optionId, qo.optionText
        FROM trial AS tr
        JOIN stage
        ON stage.trialId = tr.id
        JOIN active_patients AS pa
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
        AND si.state = 'completed'
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
        const property = ['trialName', 'pin', 'name', 'id', 'questionText', 'questionId',
        'deviceType', 'deviceVersion', 'dateStarted', 'dateCompleted'];
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
