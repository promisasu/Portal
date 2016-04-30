'use strict';

/**
 * @module controller/helper/create-survey-instance
 */

const moment = require('moment');
const database = require('../../model');

/**
 * Creates a survey instance for a patient to complete
 * @param {Number} patientPin - Identifier for patient who needs a survey
 * @param {Number} surveyTemplateId - Identifier for Survey Template that contains questions to be answered
 * @param {Date} startDate - Datetime that survey will become availible
 * @param {Number} openForDuration - How long patient has to complete the survey
 * @param {String} openForUnit - Unit of time for openForDuration (hours, days, weeks)
 * @param {Transaction} transaction - DB transaction to group operations
 * @returns {Null} Returns when completed
 */
function createSurveyInstance (patientPin, surveyTemplateId, startDate, openForDuration, openForUnit, transaction) {
    const patient = database.sequelize.model('patient');
    const surveyTemplate = database.sequelize.model('survey_template');
    const surveyInstance = database.sequelize.model('survey_instance');

    return Promise.all([
        patient.findOne(
            {
                where: {
                    pin: patientPin
                },
                transaction
            }
        ),
        surveyTemplate.findById(surveyTemplateId, {transaction}),
        surveyInstance.create(
            {
                startTime: startDate,
                endTime: moment(startDate).add(openForDuration, openForUnit)
            },
            {transaction}
        )
    ])
    // Link SurveyInstance to Patient and SurveyTemplate
    .then(([currentPatient, currentSurveyTemplate, newSurveyInstance]) => {
        if (!currentPatient) {
            throw new Error('patient does not exist');
        }

        if (!currentSurveyTemplate) {
            throw new Error('survey template does not exist');
        }

        return Promise.all([
            currentSurveyTemplate.addSurvey_instance(newSurveyInstance, {transaction}),
            currentPatient.addSurvey_instance(newSurveyInstance, {transaction})
        ]);
    });
}

module.exports = createSurveyInstance;
