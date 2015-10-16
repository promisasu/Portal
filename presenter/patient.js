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
                startTime: '09/05/2015 01:01:01',
                endTime: '09/08/2015 11:00:00',
                userSubmissionTime: '09/05/2015 01:01:01',
                actualSubmissionTime: '09/07/2015 15:01:01',
                completed: true
            },
            {
                id: 6546,
                stage: 1,
                surveyType: 'Weekly',
                startTime: '09/05/2015 01:01:01',
                endTime: '09/05/2015 01:01:01',
                userSubmissionTime: '09/07/2015 01:01:01',
                actualSubmissionTime: '09/07/2015 13:01:01',
                completed: true
            },
            {
                id: 7865,
                stage: 1,
                surveyType: 'Daily',
                startTime: '09/05/2015 01:01:01',
                endTime: '09/05/2015 01:01:01',
                userSubmissionTime: '09/05/2015 01:01:01',
                actualSubmissionTime: '09/05/2015 11:01:01',
                completed: false
            }
        ]
    });
};
