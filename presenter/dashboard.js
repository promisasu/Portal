'use strict';

/**
 * @module presenter/dashboard
 */

/**
 * A dashboard view with overview of all trials and patients.
 * @function dashboard
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('dashboard', {
        title: 'Pain Reporting Portal'
    });
};
