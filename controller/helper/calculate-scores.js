'use strict';

/**
 * @module controller/helper/calculate-scores
 */
const PR_Anxiety_TScore_Pediatric = [32.3, 36.7, 39.2, 41.4, 43.3, 45.1, 46.7, 48.2, 49.6,
    50.9, 52.3, 53.5, 54.8, 56.0, 57.3, 58.5,
    59.7, 60.9, 62.1, 63.3, 64.5, 65.8, 67.0, 68.3, 69.6, 70.9, 72.3, 73.7,
    75.2, 76.8, 78.6, 80.5, 82.8
];
const PR_Anxiety_TScore_Parent = [34.0, 38.0, 41.0, 40, 44, 46.0, 48.0, 49.0,
    51.0, 52.0, 54, 55, 56, 58, 59, 61, 62, 64, 65, 66, 68, 69, 71, 72, 73, 75,
    76, 77, 79, 80, 82, 84, 86, 88
];
const PR_Anxiety_TScore_Adult = [37.1, 43.2, 45.9, 47.8, 49.4, 50.8, 52.1, 53.2,
54.3, 55.4, 56.4, 57.4, 58.4, 59.4, 60.4, 61.4, 62.5, 63.5, 64.5, 65.6, 66.6,
67.7, 68.7, 69.8, 70.8, 71.9, 73.0, 74.1, 75.4, 76.7, 78.2, 80.0, 83.1];
const PR_Fatigue_TScore_Pediatric = [30.3, 34.3, 36.9, 39, 40.9, 42.5, 44, 45.4, 46.7,
    47.9, 49.1, 50.2, 51.3, 52.4, 53.5, 54.5,
    55.6, 56.6, 57.6, 58.6, 59.6, 60.6, 61.6,
    62.6, 63.6, 64.6, 65.6, 66.7, 67.7, 68.7,
    16, 9.8, 70.9, 72, 73.2, 74.4, 75.7, 77.0,
    78.5, 80.2, 82.0, 84.0
];
const PR_Fatigue_TScore_Parent = [34, 39, 42, 44, 45, 47, 48, 49, 50, 51, 52,
    53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 72, 73, 74, 75, 76, 77, 79, 80, 82, 85
];
const PR_Fatigue_TScore_Adult = [33.1, 38.5, 41.0, 42.8, 44.3, 45.6, 46.9,
48.1, 49.2, 50.4, 51.5, 52.5, 53.6, 54.6, 55.6, 56.6, 57.5, 58.5, 59.4, 60.4,
61.3, 62.3, 63.3, 64.3, 65.3, 66.4, 67.5, 68.6, 69.8, 71.0, 72.4, 74.2, 77.8];
const PR_PhyFuncMob_TScore_Pediatric = [
    12.6, 13.6, 14.7, 15.7, 16.8, 17.9, 18.9, 19.9, 20.8, 21.7, 22.6, 23.5,
    24.4, 25.3, 26.1, 27.0, 27.9, 28.8, 29.8, 30.8, 31.8, 32.9, 34.1, 35.4,
    36.8, 38.5, 40.4, 42.3, 44.9, 49.0, 56.7
];
const PR_PhyFuncMob_TScore_Parent = [14, 17, 20, 21, 22, 23,
    24, 25, 26, 27, 27, 28, 29, 29, 30, 31, 31,
    32, 33, 33, 34, 35, 35, 36, 37, 38, 39, 40,
    42,
    43, 45, 48, 56
];
const PR_PhyFuncMob_TScore_Adult = [
    20.2, 23.7, 25.6, 27.0, 28.2, 29.3, 30.3, 31.2, 32.0, 32.7, 33.5, 34.2,
    34.9, 35.5, 36.2, 36.9, 37.5, 38.2, 38.9, 39.5, 40.2, 40.9, 41.6, 42.4,
    43.1, 43.9, 44.8, 45.7, 46.8, 48.0, 49.6, 51.8, 59.2
];
const PR_PainInt_TScore_Pediatric = [34.0, 38.7, 40.6, 42.7, 44.3, 45.8, 47.1, 48.4,
    49.5, 50.6, 51.7, 52.7, 53.7, 54.7, 55.7,
    56.6, 57.6, 58.5, 59.5, 60.4, 61.4, 62.4,
    63.4, 64.4, 65.4, 66.5, 67.6, 68.8, 70.1,
    71.5, 73.2, 75.0, 78.0
];
const PR_PainInt_TScore_Parent = [38, 44, 46, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 58, 59, 60, 61, 62, 62,
    63, 64, 65, 66, 67, 67, 68, 69, 70, 71, 73, 74, 78
];
const PR_PainInt_TScore_Adult = [
    40.7, 47.9, 49.9, 51.2, 52.3, 53.2, 54.1, 55.0, 55.8, 56.6, 57.4, 58.1,
    58.8, 59.5, 60.2, 60.8, 61.5, 62.1, 62.8, 63.5, 64.1, 64.8, 65.5, 66.2,
    66.9, 67.7, 68.4, 69.2, 70.1, 71.0, 72.1, 73.5, 77.0
];

const moment = require('moment');
const viewDateFormat = 'MM-DD-YYYY HH:mm';
const config = require('../../config.json');

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
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (typeof singleSurveyBlock[result.id] === 'undefined') {
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
            scoreFatigue = (scoreFatigue * 10) / 6;
            scorePhyFunc = (scorePhyFunc * 8) / 6;
            scorePainInt = (scorePainInt * 8) / 6;
            scoreAnxity = (scoreAnxity * 8) / 6;
            score = scoreFatigue + scoreAnxity + scorePainInt + scorePhyFunc;
            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }

    return resultSet;
}

/**
 * A helper function that calculates fatigue scores.
 * @param {Array<Object>} surveyResults - set of questions responses
 * @returns {Array<Object>} - array of results with fatigue scores
 */
function calculatePR_Fatigue (surveyResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];
    let maxVal = 0;

    surveyResults.forEach((result) => {
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (typeof singleSurveyBlock[result.id] === 'undefined') {
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
                        score += parseInt(answer.likertScale);
                    }
                }
            });

            score = (score * 8) / 6;
            score = Math.round(score);
            if (questionType === 'PR_Fatigue_Adlt') {
                score = PR_Fatigue_TScore_Adult[score];
                maxVal = calculateConversionFactor(PR_Fatigue_TScore_Adult);
            } else if (questionType === 'PR_Fatigue_Chld') {
                score = PR_Fatigue_TScore_Pediatric[score];
                maxVal = calculateConversionFactor(PR_Fatigue_TScore_Pediatric);
            } else {
                score = PR_Fatigue_TScore_Parent[score];
                maxVal = calculateConversionFactor(PR_Fatigue_TScore_Parent);
            }

            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }

    return [resultSet, maxVal];
}

/**
 * A helper function that calculates anxiety scores.
 * @param {Array<Object>} data - set of scores
 * @returns {Number} - conversion factor
 */
function calculateConversionFactor (data) {
    return 100 / data[data.length - 1];
}

/**
 * A helper function that calculates anxiety scores.
 * @param {Array<Object>} surveyResults - set of questions responses
 * @returns {Array<Object>} - array of results with anxiety scores
 */
function calculatePR_Anxiety (surveyResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];
    let maxVal = 0;

    surveyResults.forEach((result) => {
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (typeof singleSurveyBlock[result.id] === 'undefined') {
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
            let score = 0;
            let date = new Date();
            let questionType = '';
            let patientType = '';

            singleSurveyBlock[activityInstanceId].forEach((answer) => {
                date = moment(answer.StartTime).format(viewDateFormat);
                questionType = answer.questionType;
                patientType = answer.patientType;
                if (isInt(answer.likertScale)) {
                    if (questionType.includes('PR_Anxiety')) {
                        score += parseInt(answer.likertScale);
                    }
                }
            });

            score = (score * 10) / 6;
            score = Math.round(score);
            if (questionType === 'PR_Anxiety_Adlt') {
                score = PR_Anxiety_TScore_Adult[score];
                maxVal = calculateConversionFactor(PR_Anxiety_TScore_Adult);
            } else if (questionType === 'PR_Anxiety_Chld') {
                score = PR_Anxiety_TScore_Pediatric[score];
                maxVal = calculateConversionFactor(PR_Anxiety_TScore_Pediatric);
            } else {
                score = PR_Anxiety_TScore_Parent[score];
                maxVal = calculateConversionFactor(PR_Anxiety_TScore_Parent);
            }
            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }

    return [resultSet, maxVal];
}

/**
 * A helper function that calculates physical function.
 * @param {Array<Object>} surveyResults - set of questions responses
 * @returns {Array<Object>} - array of results with physical func scores
 */
function calculatePR_PhyFuncMob (surveyResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];
    let maxVal = 0;

    surveyResults.forEach((result) => {
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (typeof singleSurveyBlock[result.id] === 'undefined') {
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
            let score = 0;
            let date = new Date();
            let questionType = '';
            let patientType = '';

            singleSurveyBlock[activityInstanceId].forEach((answer) => {
                date = moment(answer.StartTime).format(viewDateFormat);
                questionType = answer.questionType;
                patientType = answer.patientType;
                if (isInt(answer.likertScale)) {
                    if (questionType.includes('PR_PhyFuncMob')) {
                        score += parseInt(answer.likertScale);
                    }
                }
            });

            score = (score * 8) / 6;
            score = Math.round(score);
            if (questionType === 'PR_PhyFuncMob_Adlt') {
                score = PR_PhyFuncMob_TScore_Adult[score];
                maxVal = calculateConversionFactor(PR_PhyFuncMob_TScore_Adult);
            } else if (questionType === 'PR_PhyFuncMob_Chld') {
                score = PR_PhyFuncMob_TScore_Pediatric[score];
                maxVal = calculateConversionFactor(PR_PhyFuncMob_TScore_Pediatric);
            } else {
                score = PR_PhyFuncMob_TScore_Parent[score];
                maxVal = calculateConversionFactor(PR_PhyFuncMob_TScore_Parent);
            }
            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }

    return [resultSet, maxVal];
}

/**
 * A helper function that calculates pain intensity.
 * @param {Array<Object>} surveyResults - set of questions responses
 * @returns {Array<Object>} - array of results with pain intensity scores
 */
function calculatePR_PainInt (surveyResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];
    let maxVal = 0;

    surveyResults.forEach((result) => {
        let temp = {
            questionId: result.questionId,
            optionId: result.optionId,
            optionText: result.optionText,
            questionType: result.questionType,
            StartTime: result.StartTime,
            likertScale: result.likertScale,
            patientType: result.patientType
        };

        if (typeof singleSurveyBlock[result.id] === 'undefined') {
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
            let score = 0;
            let date = new Date();
            let questionType = '';
            let patientType = '';

            singleSurveyBlock[activityInstanceId].forEach((answer) => {
                date = moment(answer.StartTime).format(viewDateFormat);
                questionType = answer.questionType;
                patientType = answer.patientType;
                if (isInt(answer.likertScale)) {
                    if (questionType.includes('PR_PainInt')) {
                        score += parseInt(answer.likertScale);
                    }
                }
            });

            score = (score * 8) / 6;
            score = Math.round(score);
            if (questionType === 'PR_PainInt_Adlt') {
                score = PR_PainInt_TScore_Adult[score];
                maxVal = calculateConversionFactor(PR_PainInt_TScore_Adult);
            } else if (questionType === 'PR_PainInt_Chld') {
                score = PR_PainInt_TScore_Pediatric[score];
                maxVal = calculateConversionFactor(PR_PainInt_TScore_Pediatric);
            } else {
                score = PR_PainInt_TScore_Parent[score];
                maxVal = calculateConversionFactor(PR_PainInt_TScore_Parent);
            }
            result.x = date;
            result.y = score;
            resultSet.push(result);
        }
    }

    return [resultSet, maxVal];
}

/**
 * A helper function that calculates opioid score results.
 * @param {Array<Object>} opioidResults - set of opioid questions responses
 * @returns {Array<Object>} - array of results with opioid scores
 */
function opioidResultsCalculation (opioidResults) {
    let returnArr = getOpioidActualValuesCalculated(opioidResults);
    let tempMax = 0;
    let i = 0;

    for (i = 0; i < returnArr.length; i++) {
        if (tempMax < returnArr[i].y) {
            tempMax = returnArr[i].y;
        }
    }
    let actualOpioidVal = getOpioidTHresholdActualValue(opioidResults);
    let returnArrValues = [];
    let multiplier = 0;

    if (tempMax > actualOpioidVal) {
        multiplier = tempMax;
    } else {
        multiplier = actualOpioidVal;
    }
    for (i = 0; i < returnArr.length; i++) {
        returnArr[i].y = returnArr[i].y * 100 / multiplier;
    }

    return returnArr;
}

/**
 * A helper function that calculates opioid score threshold.
 * @param {Array<Object>} opioidResults - set of opioid questions responses
 * @returns {Array<Object>} - array of results with opioid scores
 */
function opioidThresholdCalculation (opioidResults) {
    let opioidVal = getOpioidTHresholdActualValue(opioidResults);
    let opioid = 0;
    let tempMax = 0;
    let opioidActualVals = getOpioidActualValuesCalculated(opioidResults);
    let i = 0;

    for (i = 0; i < opioidActualVals.length; i++) {
        if (tempMax < opioidActualVals[i].y) {
            tempMax = opioidActualVals[i].y;
        }
    }
    if (tempMax > opioidVal) {
        opioidVal = opioidVal * 100 / tempMax;
    }
    let returnArr = [];

    for (i = 0; i < opioidResults.length; i++) {
        returnArr.push(opioidVal);
    }

    return returnArr;
}

/**
 * A helper function that returns actual opioid score threshold.
 * @param {Array<Object>} opioidResults - set of opioid questions responses
 * @returns {Array<Object>} - array of results with opioid scores
 */
function getOpioidTHresholdActualValue (opioidResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let oxy = 0;
    let tra = 0;
    let dil = 0;

    opioidResults.forEach((result) => {
        result.optionText = result.optionText.replace(' ', '');
        if (result.optionText === 'Oxycodone') {
            oxy = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText];
            oxy *= parseFloat(result.prescribedDosage);
        }
        if (result.optionText === 'Tramadol') {
            tra = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText];
            tra *= parseFloat(result.prescribedDosage);
        }
        if (result.optionText === 'Dilaudid') {
            dil = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText];
            dil *= parseFloat(result.prescribedDosage);
        }
    });

    return oxy + tra + dil;
}

/**
 * A helper function that calculates opioid score threshold.
 * @param {Array<Object>} opioidResults - set of opioid questions responses
 * @returns {Array<Object>} - array of results with opioid scores
 */
function getOpioidActualValuesCalculated (opioidResults) {
    let singleSurveyBlock = {};
    let instanceId = '';
    let resultSet = [];
    let date = new Date();

    opioidResults.forEach((result) => {
        result.optionText = result.optionText.replace(' ', '');
        if (result.optionText === 'Oxycodone' || result.optionText === 'Tramadol' || result.optionText === 'Dilaudid') {
            let temp = {
                questionId: result.questionId,
                optionId: result.optionId,
                optionText: result.optionText,
                questionType: result.questionType,
                StartTime: result.StartTime,
                likertScale: result.likertScale,
                patientType: result.patientType,
                dosage: result.dosage,
                prescribedDosage: result.prescribedDosage,
                prescribedNoOfTablets: result.prescribedNoOfTablets
            };

            if (typeof singleSurveyBlock[result.id] === 'undefined') {
                singleSurveyBlock[result.id] = [temp];
            } else {
                singleSurveyBlock[result.id].push(temp);
            }
        }
    });
    let returnDict = {};
    let returnArr = [];

    for (let key in singleSurveyBlock) {
        if (singleSurveyBlock.hasOwnProperty(key)) {
            let result = {
                x: '',
                y: 0
            };

            date = moment(singleSurveyBlock[key][0].StartTime).format(viewDateFormat);
            returnDict[date] = 0;
            singleSurveyBlock[key].forEach((survey) => {
                survey.dosage = survey.dosage.replace(' ', '');
                survey.dosage = survey.dosage.replace('*', '');
                returnDict[date] += parseFloat(survey.dosage) * config.opioid[survey.optionText]
                                    * parseFloat(survey.prescribedDosage);
            });
            result.y = returnDict[date];
            result.x = date;
            returnArr.push(result);
        }
    }

    return returnArr;
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
    calculatePromisScores: calculatePromisScores,
    calculatePR_Fatigue: calculatePR_Fatigue,
    calculatePR_Anxiety: calculatePR_Anxiety,
    calculatePR_PhyFuncMob: calculatePR_PhyFuncMob,
    opioidResultsCalculation: opioidResultsCalculation,
    opioidThresholdCalculation: opioidThresholdCalculation,
    calculatePR_PainInt: calculatePR_PainInt
};
