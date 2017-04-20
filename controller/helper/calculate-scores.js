'use strict';

/**
 * @module controller/helper/calculate-scores
 */

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
        // //console.log(result);
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
    // returnData = {};
    // returnData['data'] = resultSet;
    // returnData['labels'] = [];
    // for (var i = 0; i < returnData['data'].length; i++) {
    //   returnData['labels'].push(returnData['data'][i].x);
    // }
}

function opioidResultsCalculation(opioidResults){
  let singleSurveyBlock = {};
  let instanceId = '';
  let resultSet = [];
  let date = new Date();
  opioidResults.forEach((result) => {
      result.optionText = result.optionText.replace(" ", "");
      if (result.optionText == 'Oxycodone' || result.optionText == 'Tramadol' || result.optionText == 'Dilaudid'  ) {
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
  for (var key in singleSurveyBlock) {
    if (singleSurveyBlock.hasOwnProperty(key)) {
      let result = {
          x: '',
          y: 0
      };
        date = moment(singleSurveyBlock[key][0].StartTime).format(viewDateFormat);
        //console.log(date);
        returnDict[date] = 0;
        singleSurveyBlock[key].forEach((survey) => {
            survey.dosage = survey.dosage.replace(" ","");
            survey.dosage = survey.dosage.replace("*","");
            returnDict[date] += parseFloat(survey.dosage) * config.opioid[survey.optionText] * parseFloat(survey.prescribedDosage);

        });
        result.y=returnDict[date];
        result.x = date;
        returnArr.push(result);
    }
  }
  return returnArr;
}

function opioidThresholdCalculation(opioidResults){
  //console.log("adasdasdsa");
  let singleSurveyBlock = {};
  let instanceId = '';
  let oxy = 0;
  let tra = 0;
  let dil = 0;
  //console.log("adasdasdsa");
  //console.log(opioidResults);
  opioidResults.forEach((result) => {
      result.optionText = result.optionText.replace(" ", "");
      //console.log(result);
      if (result.optionText == 'Oxycodone') {
        oxy = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText] * parseFloat(result.prescribedDosage);
      }
      if (result.optionText == 'Tramadol') {
        tra = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText] * parseFloat(result.prescribedDosage);
      }
      if (result.optionText == 'Dilaudid') {
        dil = parseFloat(result.prescribedNoOfTablets) * config.opioid[result.optionText] * parseFloat(result.prescribedDosage);
      }
    });
    //console.log("adasdasdsa");
    //console.log(oxy + tra + dil);
    var returnArr = [];
    for (var i = 0; i < opioidResults.length; i++) {
      returnArr.push(50);
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
    opioidResultsCalculation: opioidResultsCalculation,
    opioidThresholdCalculation: opioidThresholdCalculation
};
