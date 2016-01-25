'use strict';

/**
 * @module rule/score/raw-score
 */

const database = require('../../model');

/**
 * Calculates the raw score for a survey instance
 * @param {Number} surveyInstanceId - survey
 * @returns {Promise} resolves raw score
 */
function calculateRawScore (surveyInstanceId) {
    return database.sequelize.query(
        `
        SELECT SUM(qo.order), COUNT(qr.id)
        FROM survey_instance si
        JOIN question_result qr
        ON qr.surveyInstanceId = si.id
        JOIN question_option qo
        ON qo.id = qr.questionOptionId
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
