'use strict';

const database = require('../../model');

module.exports = function (request, reply) {
    const trial = database.sequelize.model('trial');

    reply(trial.findAll({}));
};
