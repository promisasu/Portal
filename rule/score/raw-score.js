'use strict';

const database = require('../../model');

/**
 * Calculates the raw score for a survey instance
 * @param {Number} surveyInstanceId - survey
 * @returns {Promise} resolves raw score
 */
function calculateRawScore (surveyInstanceId) {
    return database.sequelize.query(
        `
        SELECT SUM(jqi.optionOrder), COUNT(qi.id)
        FROM survey_instance si
        JOIN question_instance qi
        ON qi.surveyInstanceId = si.id
        JOIN question_template
        ON qt.id = qi.surveyTemplateId
        JOIN join_questions_and_options jqo
        ON jqo.questionOptionId = qi.id
        WHERE si.id = ?
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                surveyInstanceId
            ]
        }
    )
    .then((result) => {
        console.log(result);
    });
}

module.exports = calculateRawScore;
