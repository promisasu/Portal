'use strict';

/**
 * @module model/join-patients-surveys-and-schedules
 */

/**
 * This joins the Patients table, SurveyTemplates table and ScheduleInstances
 * @typedef {Object} JoinPatientsSurveysAndSchedules
 */

/**
 * Registers model with Sequelize
 * @function register
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
module.exports = function (sequelize) {
    sequelize.define('join_patients_surveys_and_schedules', {});
};
