'use strict';

/**
 * @module controller/handler/compliance-values
 */

const database = require('../../model');
const moment = require('moment');
const processComplianceCount = require('../helper/process-compliance-count');
const httpNotFound = 404;

/**
 * A dashboard with an overview of a specific trial.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function complianceValues (request, reply) {
    const fromDate = request.query.fromDate;
    const toDate = request.query.toDate;

    Promise
        .all([

            database.sequelize.query(
                `
                SELECT pa.id, pa.pin,
                SUM(si.state = 'expired') AS expiredCount,
                SUM(si.state = 'completed') AS completedCount
                FROM survey_instance AS si
                JOIN active_patients AS pa
                ON pa.id = si.patientId
                JOIN stage AS st
                ON st.id = pa.stageId
                WHERE st.trialId = ?
                AND si.startTime >= ?
                AND si.endTime <= ?
                GROUP BY pa.id
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id,
                        moment(fromDate)
                            .format('YYYY-MM-DD HH:mm:ss'),
                        moment(toDate)
                            .format('YYYY-MM-DD HH:mm:ss')
                    ]
                }
            )
        ])
        .then((compliance) => {
            const complianceCount = processComplianceCount(compliance);

            return reply(complianceCount);
        })
        .catch((err) => {
            request.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = complianceValues;
