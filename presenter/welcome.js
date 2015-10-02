'use strict';

/**
 * @module presenter/welcome
 */

/**
 * A welcome view to say hello.
 * @function welcome
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    reply.view('welcome', {
        title: 'Pain Reporting Portal'
    });
};
