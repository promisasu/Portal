'use strict';

const database = require('../../model');

/**
 * Checks to see if patient should have a new surveyInstance
 * @param {String} patientId - Id of Patient to check
 * @returns {Promise.<Object,Null>} Returns with info needed to run create survey
 */
function checkSurveysForPatient (patientId) {
    const patient = database.sequelize.model('patient');
    const surveyInstance = database.sequelize.model('survey_instance');
    const surveyTemplate = database.sequelize.model('survey_template');
    const stage = database.sequelize.model('stage');
}

module.exports = checkSurveysForPatient;
