'use strict';

/**
 * @module api/handler/get-survey
 */

const database = require('../../model');
const processSurveyInstance = require('../helper/process-survey-instance');
const _ = require('lodash');

/**
 * Gets all of the QuestionTemplates and QuestionOptions for a SurveyTemplate
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with JSON data structure
 */
function getSurvey (request, reply) {
    database.sequelize.query(
        `
        SELECT *
        FROM survey_instance AS si
        JOIN survey_template st
        ON st.id = si.surveyTemplateId
        JOIN join_surveys_and_questions jsq
        ON jsq.surveyTemplateId = st.id
        JOIN question_template qt
        ON qt.id = jsq.questionTemplateId
        JOIN join_questions_and_options jqo
        ON jqo.questionTemplateId = qt.id
        JOIN question_option qo
        ON qo.id = jqo.questionOptionId
        WHERE si.id = ?
        ORDER BY jsq.questionOrder, jqo.optionOrder
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                request.query.surveyInstanceID
            ]
        }
    )
    .then((data) => {
        const final = {
            surveyInstanceID: _.chain(data).first().get('id').value(),
            surveyName: _.chain(data).first().get('name').value(),
            message: 'SUCCESS',
            questions: _.chain(data).groupBy('questionOrder').map(processSurveyInstance).value()
        };

        reply(final);
    });
}

module.exports = getSurvey;
