'use strict';

/**
 * @module presenter/survey
 */


// TODO
const survey = {
    id: 1234567
};

/**
 * A dashboard with an overview of a specific survey.
 * @function survey
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('survey', {
        title: 'Pain Reporting Portal',
        patient: {
            id: 1234
        },
        trial: {
            id: 1,
            name: 'test'
        },
        survey: survey,
        surveyJson: JSON.stringify(survey)
    });
};
