'use strict';

/**
 * @module rule/task/create-survey
 */

const moment = require('moment');
const database = require('../../model');

/**
 * Creates a survey instance for a patient to complete
 * @param {Number} patientPin - Identifier for patient who needs a survey
 * @param {Number} surveyTemplateId - Identifier for Survey Template that contains questions to be answered
 * @param {Number} open - How long until Survey opens
 * @param {Number} duration - How long patient has to complete the survey (after it starts)
 * @param {String} unit - Unit of time for open and duration (hours, days, weeks)
 * @returns {Null} Returns when completed
 */
function createSurveyInstance (patientPin, surveyTemplateId, open, duration, unit) {
    const patient = database.sequelize.model('patient');
    const surveyTemplate = database.sequelize.model('survey_template');
    const surveyInstance = database.sequelize.model('survey_instance');
    let transaction = null;

    // start transaction
    database.sequelize.transaction()
    // Get Patient and SurveyTemplate to link to
    // Create new SurveyInstance
    .then((newTransaction) => {
        transaction = newTransaction;

        return Promise.all([
            patient.findOne(
                {
                    where: {
                        pin: patientPin
                    }
                },
                {transaction}
            ),
            surveyTemplate.findById(surveyTemplateId, {transaction}),
            surveyInstance.create(
                {
                    startTime: moment().add(open, unit),
                    endTime: moment().add(open + duration, unit)
                },
                {transaction}
            )
        ]);
    })
    // Link SurveyInstance to Patient and SurveyTemplate
    .then((data) => {
        const currentPatient = data[0];
        const currentSurveyTemplate = data[1];
        const newSurveyInstance = data[2];

        currentSurveyTemplate.addSurveyInstance(newSurveyInstance, {transaction});
        currentPatient.addSurveyInstance(newSurveyInstance, {transaction});
    })
    .then(() => {
        transaction.commit();
    })
    .catch((err) => {
        transaction.rollback();
        return Promise.reject(err);
    });
}

module.exports = createSurveyInstance;
