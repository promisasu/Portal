'use strict';

/**
 * @module controller/handler/webform
 */

const fs = require('fs');
const configuration = require('../../config.json');

 /**
  * A dashboard with an overview of a specific patient.
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {View} Rendered page
  */
function webform (request, reply) {
    return reply.view('webform', {
        title: 'Add a new Patient',
        webFormPostUrl: configuration.webFormPostUrl,
        trialId: request.params.trialId,
        apiURL: configuration.apiURL
    });
}

module.exports = webform;
