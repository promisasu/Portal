'use strict';

/**
 * @module presenter/trial
 */

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('trial', {
        title: 'Pain Reporting Portal'
    });
};
