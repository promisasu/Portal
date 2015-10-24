'use strict';

/**
 * @module presenter/patient
 */

const color = require('colors.css');

const surveys = [
    {
        id: 1234,
        title: 'Monthly Survey',
        stage: 1,
        surveyType: 'Monthly',
        start: '10/01/2015',
        end: '10/01/2015',
        userSubmissionTime: '10/01/2015 15:43:35',
        completed: true,
        color: color.green
    },
    {
        id: 2345,
        title: 'Daily Survey',
        stage: 1,
        surveyType: 'Daily',
        start: '10/02/2015',
        end: '10/02/2015',
        userSubmissionTime: '10/02/2015 13:11:15',
        completed: true,
        color: color.green
    },
    {
        id: 3456,
        title: 'Weekly Survey',
        stage: 1,
        surveyType: 'Weekly',
        start: '10/05/2015',
        end: '10/05/2015',
        userSubmissionTime: '10/05/2015 11:12:43',
        completed: true,
        color: color.green
    },
    {
        id: 4567,
        title: 'Daily Survey',
        stage: 1,
        surveyType: 'Daily',
        start: '10/06/2015',
        end: '10/06/2015',
        userSubmissionTime: 'N/A',
        completed: false,
        color: color.red
    },
    {
        id: 5678,
        title: 'Daily Survey',
        stage: 1,
        surveyType: 'Daily',
        start: '10/07/2015',
        end: '10/07/2015',
        userSubmissionTime: '10/07/2015 05:56:11',
        completed: true,
        color: color.green
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
    reply.view('patient', {
        title: 'Pain Reporting Portal',
        patient: {
            id: 1234,
            start: '08/25/2015',
            duration: '60 days',
            patientCount: 1023,
            noncompliantCount: 8
        },
        trial: {
            id: 1,
            name: 'test'
        },
        surveys: surveys,
        surveysJson: JSON.stringify(surveys) 
    });

    var scatterChartData = {
        datasets: [{
            label: "Compliance Chart",
            data: [{
                    x: 1,
                    y: 0
                }, {
                    x: 1,
                    y: 51
                }, {
                    x: 2,
                    y: 52
                }, {
                    x: 3,
                    y: 53
                }, {
                    x: 4,
                    y: 54
                }
            ], 
            borderColor: "rgba(220,220,220,1)",
            backgroundColor: "rgba(220,220,220,0.2)",
            pointBorderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderWidth: "1"
        }] 
    }
    }; 
