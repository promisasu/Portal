'use strict';

/**
 * @module controller/handler/webform
 */


 /**
  * A dashboard with an overview of a specific patient.
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {View} Rendered page
  */
 function webform (request, reply) {
   return reply.view('webform',{'title':'Add a new Patient'});
}

module.exports = webform;
