'use strict';

/**
 * @module controller/helper/process-survey
 */

const moment = require('moment');

/**
 * Takes in a Survey model and processes it into human readable format
 * @param {Trial} currentSurvey - a single Survey object
 * @returns {Object} processed Survey
 */
function processSurvey (currentSurvey) {
    const survey = currentSurvey;
  
    const frequencyOptions = [
        'Never',
        'Almost Never',
        'Sometimes',
        'Often',
        'Almost Always'
    ];

    const difficultyOptions = [
        'With no trouble',
        'With a little trouble',
        'With some trouble',
        'With a lot a trouble',
        'Not able to do'
    ];

    const bodyOptions = [
        'Front head',
        'Back head',
        'Front left leg',
        'Back left leg',
        'Front right leg',
        'Back right leg',
        'Front chest',
        'Front abdominal',
        'Back',
        'Lower back',
        'Front left arm',
        'Back left arm',
        'Front right arm',
        'Back right arm',
        'No pain'
    ];
  
    // TODO: fix data in seed SQL to account for all question options
    // TODO: have some way to store possible options for a question type in the DB
    for (let i=0; i<survey.length; i++) {
      if (survey[i].questionType === 'multiChoiceSingleAnswer') {
        survey[i].options = frequencyOptions;
      }
      else if (survey[i].questionType === 'bodyPain') {
        survey[i].options = bodyOptions;
      }
    }

    return {
        id: survey[0].surveyInstanceId,
        name: survey[0].name,
        startTime: moment(survey[0].startTime).format('LLL'),
        endTime: moment(survey[0].endTime).format('LLL'),
        userSubmissionTime: survey[0].userSubmissionTime ? moment(survey[0].userSubmissionTime).format('LLL') : 'timestamp unknown',
        questions: survey
    };
}

module.exports = processSurvey;
