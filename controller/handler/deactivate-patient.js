'use strict';

/**
 * @module controller/handler/deactivate-patient
 */

const boom = require('boom');
const database = require('../../model');
const moment = require('moment');

/**
 * Deactivates a patient
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
function deactivatePatient(request, reply) {

    database.sequelize.query(
        `
        UPDATE activity_instance SET State = ? where State = ? and EndTime >= ? and PatientPinFk = ?
        `, {
            type: database.sequelize.QueryTypes.UPDATE,
            replacements: [
                'DEACTIVATED',
                'pending',
                moment().format("YYYY-MM-DD HH:mm:ss"),
                request.params.pin
            ],
            plain: true
        }
    ).then(function() {
        return reply();
    }).catch((err) => {
        request.log('error', err);
        console.log(err);

        return reply(boom.conflict());
    });
}

module.exports = deactivatePatient;
