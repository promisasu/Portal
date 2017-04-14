'use strict';

/**
 * @module controller/handler/webform
 */

const configuration = require('../../config.json');

/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function webformPost (request, reply) {
    console.log(request.params);

    return reply.view('webformSuccess', {
        patientPIN: request.params.id.toString(),
        apiURL: configuration.apiURL
    });
}

module.exports = webformPost;
