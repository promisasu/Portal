'use strict';

/**
 * @module controller/handler/deactivate-patient
 */

const boom = require('boom');
const database = require('../../model');

/**
 * Deactivates a patient
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
function deactivatePatient (request, reply) {
    const patient = database.sequelize.model('patient');
    let transaction = null;

    database
    .sequelize
    .transaction()
    .then((newTransaction) => {
        transaction = newTransaction;

        return patient.findOne({
            where: {
                pin: request.params.pin
            },
            transaction
        });
    })
    .then((currentPatient) => {
        return currentPatient.destroy({transaction});
    })
    .then(() => {
        return transaction.commit();
    })
    .then(() => {
        return reply();
    })
    .catch((err) => {
        request.log('error', err);
        transaction.rollback();

        return reply(boom.conflict());
    });
}

module.exports = deactivatePatient;
