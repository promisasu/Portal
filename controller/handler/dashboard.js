
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
        SELECT *
        FROM trial AS tr
        LEFT JOIN (
        	SELECT st.trialId, COUNT(pa.id) AS recruitedCount
        	FROM stage AS st
        	JOIN patient AS pa
        	ON pa.stageId = st.id
        	GROUP BY st.trialId
        ) AS recruited
        ON tr.id = recruited.trialId
        LEFT JOIN (
        	SELECT st.trialId, COUNT(pa.id) AS completedCount
        	FROM stage AS st
        	JOIN patient AS pa
        	ON pa.stageId = st.id
        	WHERE pa.dateCompleted < ?
        	GROUP BY st.trialId
        ) AS completed
        ON tr.id = completed.trialId
        LEFT JOIN (
        	SELECT st.trialId, COUNT(pa.id) AS activeCount
        	FROM stage AS st
        	JOIN patient AS pa
        	ON pa.stageId = st.id
        	WHERE ? BETWEEN pa.dateStarted AND pa.dateCompleted
        	GROUP BY st.trialId
        ) AS active
        ON tr.id = active.trialId;
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
            request.log('error', err);

            reply
            .view('404', {
                title: 'Not Found'
            })
            .code(httpNotFound);
        });
}

module.exports = dashboardView;
