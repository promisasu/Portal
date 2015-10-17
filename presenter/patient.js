'use strict';

/**
 * @module presenter/patient
 */

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
        surveys: [
            {
                id: 1234,
                stage: 1,
                surveyType: 'Daily',
                startTime: '10/05/2015 12:00:00',
                endTime: '10/08/2015 11:59:00',
                userSubmissionTime: '10/06/2015 10:05:00',
                actualSubmissionTime: '10/08/2015 11:00:00',
                completed: true
            },
            {
                id: 6546,
                stage: 1,
                surveyType: 'Weekly',
                startTime: '10/04/2015 11:00:00',
                endTime: '10/18/2015 13:00:00',
                userSubmissionTime: '10/11/2015 13:35:00',
                actualSubmissionTime: '10/18/2015 13:00:00',
                completed: true
            },
            {
                id: 7865,
                stage: 1,
                surveyType: 'Daily',
                startTime: '10/01/2015 12:00:00',
                endTime: '10/31/2015 11:59:00',
                userSubmissionTime: '',
                actualSubmissionTime: '10/31/2015 11:59:00',
                completed: false
            }
        ]
    });
};
