'use strict';

/**
 * @module controller/helper/calculate-scores
 */

function calculatePromisScores(surveyResults) {
    var singleSurveyBlock = {};
    var instanceId;
    surveyResults.forEach(function(result) {
        var temp = {
            'questionId': result.questionId,
            'optionId': result.optionId,
            'optionText': result.optionText,
            'questionType': result.questionType
        }
        if (!singleSurveyBlock[result.id]) {
            singleSurveyBlock[result.id] = [temp];
        } else {
            singleSurveyBlock[result.id].push(temp);
        }
    });
    singleSurveyBlock
    console.log(singleSurveyBlock);

    return "BLAh";
}

module.exports = {
    calculatePromisScores: calculatePromisScores
};
