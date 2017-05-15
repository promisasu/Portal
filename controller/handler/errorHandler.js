'use strict';

/**
 * @module controller/handler/errorHandler
 */

 /**
  * An error page.
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {View} Rendered page
  */
function errorHandler (request, reply) {
    return reply.view('error', {title: 'Error! Could not process your Request'});
}

module.exports = errorHandler;
