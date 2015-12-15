'use strict';

/**
 * @module controller/helper/process-survey
 */

const moment = require('moment');
const frequencyOptions = [
    'Never',
    'Almost Never',
    'Sometimes',
    'Often',
    'Almost Always'
];

//    const difficultyOptions = [
//        'With no trouble',
//        'With a little trouble',
//        'With some trouble',
//        'With a lot a trouble',
//        'Not able to do'
//    ];

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

const first = 0;

/**
 * Takes in a Survey model and processes it into human readable format
 * @param {Trial} currentSurvey - a single Survey object
 * @returns {Object} processed Survey
 */
function processSurvey (currentSurvey) {
    const survey = currentSurvey;

    // TODO: fix data in seed SQL to account for all question options
    // TODO: have some way to store possible options for a question type in the DB
    for (let index = 0; index < survey.length; index += 1) {
        if (survey[index].questionType === 'multiChoiceSingleAnswer') {
            survey[index].options = frequencyOptions;
        } else if (survey[index].questionType === 'bodyPain') {
            survey[index].options = bodyOptions;
        }
    }

    if (survey[first].userSubmissionTime) {
        moment(survey[first].userSubmissionTime).format('LLL');
    } else {
        survey[first].userSubmissionTime = 'timestamp unknown';
    }

    return {
        id: survey[first].surveyInstanceId,
        name: survey[first].name,
        startTime: moment(survey[first].startTime).format('LLL'),
        endTime: moment(survey[first].endTime).format('LLL'),
        userSubmissionTime: survey[first].userSubmissionTime,
        questions: survey
    };
}

module.exports = processSurvey;
