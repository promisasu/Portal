'use strict';

/**
 * @module task/helper/start-scheduler
 * Starts the scheduler in the console process.
 * This is a cron job for creating survey instances for all patients.
 */

const database = require('../../model');
const moment = require('moment');
const configuration = require('../../config.json');
const zero = 0;
const one = 1;

database.setup(configuration.database);

database
.sequelize
.query(
    `
    SELECT *, pa.id AS patientId
    FROM patient AS pa
    JOIN stage AS st
    ON st.id = pa.stageId
    JOIN join_stages_and_surveys AS jss
    ON jss.stageId = st.id
    ORDER BY pa.id, jss.stagePriority
    `,
    {
        type: database.sequelize.QueryTypes.SELECT
    }
)
.then((data) => {
    const surveyInstances = data.filter(filterRules).map(createSurveys);

    return database
           .sequelize
           .model('survey_instance')
           .bulkCreate(surveyInstances);
})
.then(() => {
    console.log('survey instances created on:', new Date());
})
.catch((err) => {
    console.error(err);
});

/**
 * Takes in a all the records and filter out the ones for which survey instances have to be created.
 * @param {Object} item - a single record from the array.
 * @param {Number} index - index of the record.
 * @param {Array<Object>} array - all of the records
 * @returns {Boolean} true to keep record, false to remove
 */
function filterRules (item, index, array) {
    if (item.rule === 'weekly' && moment(item.dateStarted).day() === moment().day()) {
        console.log('First check passed');
        return true;
    } else if (item.rule === 'daily' && index > zero && item.patientId !== array[index - one].patientId) {
        console.log('Second check passed');
        return true;
    } else if (
        item.rule === 'daily'
        && index > zero
        && item.patientId === array[index - one].patientId
        && array[index - one].rule === 'weekly'
        && moment(array[index - one].dateStarted).day() !== moment().day()
    ) {
        return true;
    }
    return false;
}

/**
 * Takes a row and creates the survey_instance template
 * @param {Object} row - a single record
 * @returns {Object} a template for survey_instance creation.
 */
function createSurveys (row) {
    console.log(row);
    let unit = null;

    if (row.rule === 'daily') {
        unit = 'day';
    } else {
        unit = 'week';
    }
    return {
        patientId: row.patientId,
        surveyTemplateId: row.surveyTemplateId,
        state: 'pending',
        startTime: moment().startOf('day').toDate(),
        endTime: moment().startOf('day').add(one, unit)
    };
}
