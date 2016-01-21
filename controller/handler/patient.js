'use strict';

/**
 * @module controller/handler/patient
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');

/**
 * A dashboard with an overview of a specific patient.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function patientView (request, reply) {
    const patient = database.sequelize.model('patient');
    const trial = database.sequelize.model('trial');

    return Promise.all([
        trial.find({
            include: [
                {
                    model: patient,
                    where: {
                        pin: request.params.pin
                    }
                }
            ]
        }),
        database.sequelize.query(
            `
            SELECT *, si.id
            FROM patient AS pa
            JOIN survey_instance AS si
            ON si.patientId = pa.id
            JOIN survey_template AS st
            ON st.id = si.surveyTemplateId
            WHERE pa.pin = ?
            `,
            {
                type: database.sequelize.QueryTypes.SELECT,
                replacements: [
                    request.params.pin
                ]
            }
        )
    ])
    .then((data) => {
        reply.view('patient', {
            title: 'Pain Reporting Portal',
            patient: processPatient(data[0].patients[0]),
            trial: data[0],
            surveys: data[1],
            // TODO get real survey data
            surveysJson: JSON.stringify([])
        });
    });
}

module.exports = patientView;
