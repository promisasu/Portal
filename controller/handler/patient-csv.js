'use strict';

/**
 * @module controller/handler/patient-csv
 */

// const database = require('../../model');

/**
 * Create a Comma Seperate Value export of a single patient's data.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientCSV (request, reply) {
    // TODO get and transform data
    reply({message: 'success'});
}

module.exports = patientCSV;
