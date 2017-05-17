
'use strict';

/**
 * @module controller/handler/dashboard
 */
const processTrial = require('../helper/process-trial');
const database = require('../../model');
const httpNotFound = 404;

/**
 * A dashboard view with overview of all trials and patients.
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function dashboardView (request, reply) {
    const currentDate = new Date();

    database.sequelize.query(
        `
        SELECT t.*, s.StageId, count(1) as recruitedCount from trial t, stage s
        INNER JOIN patients pa ON s.StageId = pa.StageIdFK  WHERE t.TrialId = s.trialId;

        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                currentDate.toISOString(),
                currentDate.toISOString()
            ]
        }
        )
        .then((trials) => {
            // Process data into format expected in view
            const trialData = trials.map(processTrial);

            // Display view
            return reply.view('dashboard', {
                title: 'Pain Reporting Portal',
                user: request.auth.credentials,
                trials: trialData
            });
        })
        .catch((err) => {
            console.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = dashboardView;
