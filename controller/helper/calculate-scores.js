'use strict';

/**
 * @module controller/helper/calculate-scores
 */

const moment = require('moment');
const viewDateFormat = 'MM-DD-YYYY HH:mm';

/**
 * A helper function that calculates promise aggragate score.
 * @param {Array<Object>} surveyResults - Array of Weekly surveyResults
 * @returns {Array<Object>} - Processed result set containing PROMIS scores
 */
function calculatePromisScores (surveyResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];

    surveyResults.forEach((result) => {
        // console.log(result);
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (!singleSurveyBlock[result.id]) {
            singleSurveyBlock[result.id] = [temp];
        } else {
            singleSurveyBlock[result.id].push(temp);
        }
    });

    for (let activityInstanceId in singleSurveyBlock) {
        if (singleSurveyBlock.hasOwnProperty(activityInstanceId)) {
            let result = {
                x: '',
                y: 0
            };
            let scoreFatigue = 0;
            let scorePhyFunc = 0;
            let scorePainInt = 0;
            let scoreAnxity = 0;
            let score = 0;
            let date = new Date();
            let questionType = '';
            let patientType = '';

            singleSurveyBlock[activityInstanceId].forEach((answer) => {
                date = moment(answer.StartTime).format(viewDateFormat);
                questionType = answer.questionType;
                patientType = answer.patientType;
                if (isInt(answer.likertScale)) {
                    if (questionType.includes('PR_Fatigue')) {
                        scoreFatigue += parseInt(answer.likertScale);
                    } else if (questionType.includes('PR_PhyFuncMob')) {
                        scorePhyFunc += parseInt(answer.likertScale);
                    } else if (questionType.includes('PR_PainInt')) {
                        scorePainInt += parseInt(answer.likertScale);
                    } else if (questionType.includes('PR_Anxiety')) {
                        scoreAnxity += parseInt(answer.likertScale);
                    }
                }
            });
            // special case for parent proxy
            if (patientType === 'parent_proxy') {
                score = ((scoreFatigue * 8) / 6) + ((scorePhyFunc * 8) / 6)
                + ((scorePainInt * 8) / 6) + ((scoreAnxity * 8) / 6);
            } else {
                score = ((scoreFatigue * 10) / 6) + ((scorePhyFunc * 8) / 6)
                + ((scorePainInt * 8) / 6) + ((scoreAnxity * 8) / 6);
            }
            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }
    return resultSet;
}

/**
 * A helper function thta calculates promise aggragate score.
 * @param {Number} value - to be checked if a number
 * @returns {Boolean} - boolean value which returns if the value is a number or not
 */
function isInt (value) {
    return !isNaN(value) && ((x) => {
        return (x | 0) === x;
    })(parseFloat(value));
}

module.exports = {
    calculatePromisScores: calculatePromisScores
};
