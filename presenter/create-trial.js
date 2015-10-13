'use strict';

/**
 * @module presenter/create-trial
 */

const database = require('../model');

/**
 * Creates a new Trial
 * @function createTrial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
module.exports = function (request, reply) {
    const trial = database.sequelize.model('trial');

    trial.create(request.payload).then(function (newTrial) {
        reply.redirect('/trial/' + newTrial.id);
    });
};
