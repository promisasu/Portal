'use strict';

/**
 * @module controller/helper/process-survey
 */

const moment = require('moment');

/**
 * Takes in a Survey model and processes it into human readable format
 * @param {Survey} survey - a single Survey object
 * @returns {Object} processed Survey
 */
function processSurvey (survey) {
    // TODO: fix data in seed SQL to account for all question options
    // TODO: have some way to store possible options for a question type in the DB
    for (let index = 0; index < survey.length; index += 1) {
        if (survey[index].questionType === 'multiChoiceSingleAnswer') {
            survey[index].options = [
                'Never',
                'Almost Never',
                'Sometimes',
                'Often',
                'Almost Always'
            ];
        } else if (survey[index].questionType === 'bodyPain') {
            survey[index].options = [
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
        }
    }

    if (survey[0].userSubmissionTime) {
        moment(survey[0].userSubmissionTime).format('LLL');
    } else {
        survey[0].userSubmissionTime = 'timestamp unknown';
    }

    return {
        id: survey[0].surveyInstanceId,
        name: survey[0].name,
        startTime: moment(survey[0].startTime).format('LLL'),
        endTime: moment(survey[0].endTime).format('LLL'),
        userSubmissionTime: survey[0].userSubmissionTime,
        questions: survey
    };
}

module.exports = processSurvey;
