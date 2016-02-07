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
 * @param {Transaction} transaction - optionally pass in a transaction
 * @returns {Null} Returns when completed
 */
function createSurveyInstance (patientPin, surveyTemplateId, startDate, openForDuration, openForUnit, transaction) {
    const patient = database.sequelize.model('patient');
    const surveyTemplate = database.sequelize.model('survey_template');
    const surveyInstance = database.sequelize.model('survey_instance');
    let transactionGenerator = null;
    let internalTransaction = null;

    if (transaction) {
        transactionGenerator = Promise.resolve(transaction);
    } else {
        transactionGenerator = database.sequelize.transaction();
    }

    // start transaction
    return transactionGenerator
    // Get Patient and SurveyTemplate to link to
    // Create new SurveyInstance
    .then((newTransaction) => {
        internalTransaction = newTransaction;

        return Promise.all([
            patient.findOne(
                {
                    where: {
                        pin: patientPin
                    },
                    transaction: internalTransaction
                }
            ),
            surveyTemplate.findById(surveyTemplateId, {transaction: internalTransaction}),
            surveyInstance.create(
                {
                    startTime: startDate,
                    endTime: moment(startDate).add(openForDuration, openForUnit)
                },
                {transaction: internalTransaction}
            )
        ]);
    })
    // Link SurveyInstance to Patient and SurveyTemplate
    .then((data) => {
        const currentPatient = data[0];
        const currentSurveyTemplate = data[1];
        const newSurveyInstance = data[2];

        return Promise.all([
            currentSurveyTemplate.addSurvey_instance(newSurveyInstance, {transaction: internalTransaction}),
            currentPatient.addSurvey_instance(newSurveyInstance, {transaction: internalTransaction})
        ]);
    })
    .then(() => {
        if (transaction) {
            return null;
        }
        return internalTransaction.commit();
    })
    .catch((err) => {
        if (transaction) {
            throw err;
        } else {
            console.error(err);
            return internalTransaction.rollback();
        }
    });
}

module.exports = createSurveyInstance;
