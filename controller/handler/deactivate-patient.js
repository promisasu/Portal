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
    // const patient = database.sequelize.model('patient');
    // let transaction = null;

    // database
    // .sequelize
    // .transaction()
    // .then((newTransaction) => {
    //     transaction = newTransaction;

    //     return patient.findOne({
    //         where: {
    //             pin: request.params.pin
    //         },
    //         transaction
    //     });
    // })
    // .then((currentPatient) => {
    //     return currentPatient.destroy({transaction});
    // })
    // .then(() => {
    //     return transaction.commit();
    // })
    // .then(() => {
    //     return reply();
    // })
    // .catch((err) => {
    //     request.log('error', err);
    //     transaction.rollback();

    //     return reply(boom.conflict());
    // });

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
