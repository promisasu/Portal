'use strict';

/**
 * @module controller/handler/patient-csv
 */

const database = require('../../model');
const convertJsonToCsv = require('../helper/convert-json-to-csv');
const boom = require('boom');
const deduplicate = require('../helper/deduplicate');
const configuration = [
    {
        label: 'Patient Pin',
        key: 'pin',
        default: ''
    },
    {
        label: 'Survey Title/Type',
        key: 'name',
        default: ''
    },
    {
        label: 'Survey Activity Id',
        key: 'id',
        default: ''
    },
    {
        label: 'Question Id',
        key: 'questionId',
        default: ''
    },
    {
        label: 'Question',
        key: 'questionText',
        default: ''
    },
    {
        label: 'Answer',
        key: 'optionText',
        default: ''
    }
];

/**
 * Create a Comma Seperate Value export of a single patient's data.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientCSV (request, reply) {
    database.sequelize.query(
        `
        SELECT ai.PatientPinFK as pin, ai.activityTitle as name, act.ActivityInstanceIdFk as id, act.questionIdFk as questionId, que.QuestionText as questionText, act.questionOptionIdFk as optionId, ans.OptionText as optionText
        FROM question_result act
        JOIN questions que
        ON act.questionIdFk = que.QuestionId
        JOIN question_options ans
        ON act.questionOptionIdFk = ans.QuestionOptionId
        JOIN activity_instance ai
        ON act.ActivityInstance = ai.ActivityInstanceIdFk
        WHERE act.ActivityInstanceIdFk
        IN (SELECT ActivityInstanceId FROM activity_instance WHERE PatientPinFK = 2013 and State='completed');
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                request.params.pin
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
        request.log('error', err);
        reply(boom.notFound('patient data not found'));
    });
}

module.exports = patientCSV;
