'use strict';

/**
 * @module presenter/dashboard
 */

/**
 * A dashboard view with overview of all trials and patients.
 * @function dashboard
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('dashboard', {
        title: 'Pain Reporting Portal',
        status: {
            patientCount: 2032,
            riskCount: 52,
            noncompliantCount: 11
        },
        trials: [
            {
                id: 1,
                title: 'Ortho Post Op',
                start: '09/01/2015',
                duration: '180 days',
                patientCount: 678,
                noncompliantCount: 2
            },
            {
                id: 2,
                title: 'Sickle Cell',
                start: '08/25/2015',
                duration: '60 days',
                patientCount: 1023,
                noncompliantCount: 8
            },
            {
                id: 3,
                title: 'Pain Post Op',
                start: '09/14/2015',
                duration: '90 days',
                patientCount: 331,
                noncompliantCount: 1
            }
        ]
    });
};
