'use strict';

/**
 * @module controller/handler/patient
 */

const color = require('colors.css');
const database = require('../../model');
const processPatient = require('../helper/process-patient');

const surveys = [
    {
        id: 1234,
        title: 'Monthly',
        stage: 1,
        surveyType: 'Monthly',
        start: '11/15/2015',
        end: '11/15/2015',
        userSubmissionTime: '11/15/2015 15:43:35',
        completed: true,
        color: color.green
    },
    {
        id: 2345,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/15/2015',
        end: '11/15/2015',
        userSubmissionTime: '11/15/2015 15:43:35',
        completed: true,
        color: color.green
    },
    {
        id: 3456,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/16/2015',
        end: '11/16/2015',
        userSubmissionTime: '11/16/2015 13:11:15',
        completed: true,
        color: color.green
    },
    {
        id: 4567,
        title: 'Daily',
        stage: 1,
        surveyType: 'Weekly',
        start: '11/17/2015',
        end: '11/17/2015',
        userSubmissionTime: '11/17/2015 11:12:43',
        completed: true,
        color: color.green
    },
    {
        id: 5678,
        title: 'Weekly',
        stage: 1,
        surveyType: 'Weekly',
        start: '11/18/2015',
        end: '11/18/2015',
        userSubmissionTime: 'N/A',
        completed: false,
        color: color.red
    },
    {
        id: 6789,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/18/2015',
        end: '11/18/2015',
        userSubmissionTime: 'N/A',
        completed: false,
        color: color.red
    },
    {
        id: 7890,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/19/2015',
        end: '11/19/2015',
        userSubmissionTime: '11/19/2015 05:56:11',
        completed: true,
        color: color.green
    },
    {
        id: 8901,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/20/2015',
        end: '11/20/2015',
        userSubmissionTime: '11/20/2015 05:56:11',
        completed: true,
        color: color.green
    },
    {
        id: 9012,
        title: 'Daily',
        stage: 1,
        surveyType: 'Daily',
        start: '11/21/2015',
        end: '11/21/2015',
        userSubmissionTime: 'N/A',
        completed: false,
        color: color.red
    }
];

/**
 * A dashboard with an overview of a specific patient.
 * @function patient
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    const patient = database.sequelize.model('patient');
    const trial = database.sequelize.model('trial');
    const currentDate = new Date();

    return Promise.all([
        trial.find({
            include: [
                {
                    model: patient,
                    where: {
                        pin: request.params.pin
                    }
                }
            ]
        }),
        database.sequelize.query(
            `
            SELECT *, si.id
            FROM survey_instance si
            JOIN patient pa
            ON si.patientId = pa.id
            JOIN survey_template st
            ON si.surveyTemplateId = st.id
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        )
    ])
    .then((data) => {
        reply.view('patient', {
            title: 'Pain Reporting Portal',
            patient: processPatient(data[0].patients[0]),
            trial: data[0],
            surveys: data[1],
            surveysJson: JSON.stringify(surveys)
        });
    });
};
