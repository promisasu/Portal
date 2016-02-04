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
 * @param {Date} startDate - Datetime that survey will become availible
 * @param {Number} openForDuration - How long patient has to complete the survey
 * @param {String} openForUnit - Unit of time for openForDuration (hours, days, weeks)
 * @returns {Null} Returns when completed
 */
function createSurveyInstance (patientPin, surveyTemplateId, startDate, openForDuration, openForUnit) {
    const patient = database.sequelize.model('patient');
    const surveyTemplate = database.sequelize.model('survey_template');
    const surveyInstance = database.sequelize.model('survey_instance');
    let transaction = null;

    // start transaction
    return database
    .sequelize
    .transaction()
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
                    startTime: startDate,
                    endTime: moment(startDate).add(openForDuration, openForUnit)
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

        return Promise.all([
            currentSurveyTemplate.addSurvey_instance(newSurveyInstance, {transaction}),
            currentPatient.addSurvey_instance(newSurveyInstance, {transaction})
        ]);
    })
    .then(() => {
        return transaction.commit();
    })
    .catch((err) => {
        transaction.rollback();
        console.error(err);
        return err;
    });
}

module.exports = createSurveyInstance;
