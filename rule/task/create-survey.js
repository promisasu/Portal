'use strict';

/**
 * @module rule/task/create-survey
 */

const moment = require('moment');
const database = require('../../model');

/**
 * Creates a survey instance for a patient to complete
 * @param {Number} patientId - Identifier for patient who needs a survey
 * @param {Number} surveyTemplateId - Identifier for Survey Template that contains questions to be answered
 * @param {Number} open - How long until Survey opens
 * @param {Number} duration - How long patient has to complete the survey (after it starts)
 * @param {String} unit - Unit of time for open and duration (hours, days, weeks)
 * @returns {Null} Returns when completed
 */
function createSurveyInstance (patientId, surveyTemplateId, open, duration, unit) {
    const patient = database.sequelize.model('patient');
    const surveyTemplate = database.sequelize.model('survey_template');
    const surveyInstance = database.sequelize.model('survey_instance');

    // Get Patient and SurveyTemplate to link to
    // Create new SurveyInstance
    return Promise.all([
        patient.findById(patientId),
        surveyTemplate.findById(surveyTemplateId),
        surveyInstance.create({
            startTime: moment().add(open, unit),
            endTime: moment().add(open + duration, unit)
        })
    ])
    // Link SurveyInstance to Patient and SurveyTemplate
    .then((data) => {
        const currentPatient = data[0];
        const currentSurveyTemplate = data[1];
        const newSurveyInstance = data[2];

        currentPatient.addSurveyInstance(newSurveyInstance);
        newSurveyInstance.addSurveyTemplate(currentSurveyTemplate);
    });
}

module.exports = createSurveyInstance;
