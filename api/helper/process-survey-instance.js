'use strict';

/**
 * @module api/helper/process-survey-instance
 */

/**
 * Takes in a survey_instance model and processes it into a format recognized by app.
 * @param {Object} questionRecord - an object which has records of all questions and options for a surveyTemplate
 * @returns {Object} processed object of questions records as per the get_survey API response requirement.
 */
function processSurveyInstance (questionRecord) {
    return {
        quesID: questionRecord[0].questionTemplateId,
        questionType: questionRecord[0].questionType,
        questionText: questionRecord[0].questionText,
        answerOptions: questionRecord.map(processAnswers)
    };
}

/**
 * Takes in a survey_instance model and processes it into a format recognized by app.
 * @param {Object} answer - an object which has records of all question_options for each question_template.
 * @returns {Object} processed object of question_options as per the get_survey API response requirement.
 */
function processAnswers (answer) {
    return {
        answerID: answer.qoid,
        answerText: answer.optionText
    };
}

module.exports = processSurveyInstance;
