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
        Promise
      .all([
          database.sequelize.query(
          `
          UPDATE activity_instance SET State = ? WHERE State = ? AND EndTime >= ? AND PatientPinFk = ?
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
        ),
          database.sequelize.query(
          `
          UPDATE patients SET DateCompleted = ? WHERE PatientPin = ?
          `, {
              type: database.sequelize.QueryTypes.UPDATE,
              replacements: [
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                  request.params.pin
              ],
              plain: true
          }
        ),
          database.sequelize.query(
              `
              DELETE FROM activity_instance WHERE State = ? AND EndTime >= DATE_ADD(?, INTERVAL 1 DAY)
              AND PatientPinFk = ?
              AND activityTitle = 'Sickle Cell Daily Survey'
              `, {
                  type: database.sequelize.QueryTypes.UPDATE,
                  replacements: [
                      'DEACTIVATED',
                      moment().format('YYYY-MM-DD HH:mm:ss'),
                      request.params.pin
                  ],
                  plain: true
              }
        ),
          database.sequelize.query(
              `
              DELETE FROM activity_instance WHERE State = ? AND EndTime >= DATE_ADD(?, INTERVAL 7 DAY)
              AND PatientPinFk = ?
              AND activityTitle = 'Sickle Cell Weekly Survey'
              `, {
                  type: database.sequelize.QueryTypes.UPDATE,
                  replacements: [
                      'DEACTIVATED',
                      moment().format('YYYY-MM-DD HH:mm:ss'),
                      request.params.pin
                  ],
                  plain: true
              }
        )
      ])
      .then(() => {
          return reply();
      }).catch((err) => {
          request.log('error', err);
          console.log(err);

          return reply(boom.conflict());
      });
    } else if (Number(request.params.pin) > 4000) {
        Promise
      .all([
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
      ),
          database.sequelize.query(
          `
          DELETE FROM activity_instance WHERE State = ? AND EndTime >= DATE_ADD(?, INTERVAL 1 DAY)
          AND PatientPinFk
          IN (?, (SELECT PatientPin FROM patients WHERE ParentPinFK = ?))
          AND activityTitle = 'Sickle Cell Daily Survey'
          `, {
              type: database.sequelize.QueryTypes.UPDATE,
              replacements: [
                  'DEACTIVATED',
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                  request.params.pin,
                  request.params.pin
              ],
              plain: true
          }
      ),
          database.sequelize.query(
          `
          DELETE FROM activity_instance WHERE State = ? AND EndTime >= DATE_ADD(?, INTERVAL 7 DAY)
          AND PatientPinFk
          IN (?, (SELECT PatientPin FROM patients WHERE ParentPinFK = ?))
          AND activityTitle = 'Sickle Cell Weekly Survey'
          `, {
              type: database.sequelize.QueryTypes.UPDATE,
              replacements: [
                  'DEACTIVATED',
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                  request.params.pin,
                  request.params.pin
              ],
              plain: true
          }
      )
      ])
      .then(() => {
          return reply();
      }).catch((err) => {
          request.log('error', err);
          console.log(err);

          return reply(boom.conflict());
      });
    }
}

module.exports = deactivatePatient;
