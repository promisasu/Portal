'use strict';

/**
 * @module presenter/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('trial', {
        title: 'Pain Reporting Portal',
        trial: {
            name: 'Sickle Cell',
            description: 'A brief blurb describing the trial.',
            start: '08/25/2015',
            duration: '60 days',
            patientCount: 1023,
            noncompliantCount: 8
        },
        patients: [
            {
                id: 1234,
                status: 'danger',
                stage: 1,
                surveyType: 'Daily',
                lastTaken: '09/05/2015',
                totalMissed: 5,
                consecutiveMissed: 2
            },
            {
                id: 6546,
                status: 'success',
                stage: 1,
                surveyType: 'Weekly',
                lastTaken: '09/07/2015',
                totalMissed: 0,
                consecutiveMissed: 0
            },
            {
                id: 7865,
                status: 'warning',
                stage: 1,
                surveyType: 'Daily',
                lastTaken: '09/05/2015',
                totalMissed: 1,
                consecutiveMissed: 1
            }
        ]
    });
};
