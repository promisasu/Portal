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
        label: 'Trial Name',
        key: 'trialName',
        default: ''
    },
    {
        label: 'Patient Pin',
        key: 'pin',
        default: ''
    },
    {
        label: 'Patient Date Started',
        key: 'dateStarted',
        default: ''
    },
    {
        label: 'Patient Date Completed',
        key: 'dateCompleted',
        default: ''
    },
    {
        label: 'Survey Name',
        key: 'name',
        default: ''
    },
    {
        label: 'Survey ID',
        key: 'id',
        default: ''
    },
    {
        label: 'Question ID',
        key: 'questionId',
        default: ''
    },
    {
        label: 'Question Prompt',
        key: 'questionText',
        default: ''
    },
    {
        label: 'Question Answer',
        key: 'optionText',
        default: ''
    }
];

/**
 * Create a Comma Seperate Value export of the data of all the patient's that are enrolled in a trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialCSV (request, reply) {
    const formatSpecifier = '%a %b %d %Y %T';

    database.sequelize.query(
        `
        SELECT tr.name AS trialName, pa.pin, DATE_FORMAT(pa.dateStarted, ?) AS dateStarted,
        DATE_FORMAT( pa.dateCompleted, ?) AS dateCompleted, st.name,
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
        ORDER BY pa.pin ASC, si.id, jsq.questionOrder, qo.order
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                formatSpecifier,
                formatSpecifier,
                request.params.id
            ]
        }
    )
    .then((optionsWithAnswers) => {
        const property = [
            'trialName',
            'pin',
            'name',
            'id',
            'questionText',
            'questionId',
            'dateStarted',
            'dateCompleted'
        ];
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
