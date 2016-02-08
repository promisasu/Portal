'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const getComplianceCount = require('../handler/compliance-count');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialView (request, reply) {
    const trial = database.sequelize.model('trial');
    const stage = database.sequelize.model('stage');

    Promise
        .all([
            trial.findById(request.params.id),
            stage.findAll({
                where: {
                    trialId: request.params.id
                }
            }),
            database.sequelize.query(
                `
            SELECT *, st.name as stage
            FROM trial AS tr
            JOIN stage AS st
            ON st.trialId = tr.id
            JOIN patient AS pa
            ON pa.stageId = st.id
            WHERE tr.id = ?
            `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id
                    ]
                }
            )
        ])
        .then((data) => {
            const currentTrial = data[0];
            const stages = data[1];
            const patients = data[2];

            getComplianceCount(currentTrial, stages, patients, request.params.id, reply);
        })
        .catch((err) => {
            console.error(err);
            reply.view('404', {
                title: 'Not Found'
            });
        });
}

module.exports = trialView;
