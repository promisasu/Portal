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
  //  var options = {
  //     uri: '{{URL}}/rest/patients/enrollpatient',
  //     method: 'POST',
  //     json: JSON.stringify(formData)
  // };
  // request(options, function (error, response, body) {
  // if (!error && response.statusCode == 200) {
  //  console.log(response) // Print the shortened url.
  // }
  // });
  console.log("Going to success");
   return reply.view('webformSuccess',{'patientPIN':request.params.id.toString(),'apiURL':config.apiURL});
}

module.exports = webformPost;
