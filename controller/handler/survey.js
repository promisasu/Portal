'use strict';

/**
 * @module controller/handler/survey
 */

const database = require('../../model');
const processSurvey = require('../helper/process-survey');

/**
 * A dashboard with an overview of a specific survey.
 * @function survey
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    database.sequelize.query(
        `
        SELECT *
        FROM survey_instance si
        JOIN survey_template st
        ON st.id = si.surveyTemplateId
        JOIN question_instance qi
        ON qi.surveyInstanceId = si.id
        JOIN question_template qt
        ON qt.id = qi.questionTemplateId
        JOIN question_option qo
        ON qo.id = qi.questionOptionId
        WHERE si.id = 1
        `,
        {
            type: database.sequelize.QueryTypes.SELECT
//          ,
//            replacements: [
//                request.params.id
//            ]
        }
    )
    .then((currentSurvey) => {
        reply.view('survey', {
            title: 'Pain Reporting Portal',
            patient: {
                id: 1234
            },
            trial: {
                id: 1,
                name: 'test'
            },
            survey: processSurvey(currentSurvey)
        });
    });
};
