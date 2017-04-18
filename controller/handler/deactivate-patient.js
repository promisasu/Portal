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
function deactivatePatient (request, reply) {
    if (Number(request.params.pin) < 3000) {
        database.sequelize.query(
            `
              UPDATE activity_instance SET State = ? where State = ? and EndTime >= ? and PatientPinFk = ?
              `, {
                  type: database.sequelize.QueryTypes.UPDATE,
                  replacements: [
                      'DEACTIVATED',
                      'pending',
                      moment().format('YYYY-MM-DD HH:mm:ss'),
                      request.params.pin
                  ],
                  plain: true
              }
        ).then(() => {
            return reply();
        }).catch((err) => {
            request.log('error', err);
            console.log(err);

            return reply(boom.conflict());
        });
    } else if (Number(request.params.pin) > 4000) {
        database.sequelize.query(
            `
              UPDATE activity_instance SET State = ? WHERE State = ? AND EndTime >= ? AND PatientPinFk
              IN (?, (SELECT PatientPin FROM patients WHERE ParentPinFK = ?));
              `, {
                  type: database.sequelize.QueryTypes.UPDATE,
                  replacements: [
                      'DEACTIVATED',
                      'pending',
                      moment().format('YYYY-MM-DD HH:mm:ss'),
                      request.params.pin,
                      request.params.pin
                  ],
                  plain: true
              }
        ).then(() => {
            return reply();
        }).catch((err) => {
            request.log('error', err);
            console.log(err);

            return reply(boom.conflict());
        });
    }
}

module.exports = deactivatePatient;
