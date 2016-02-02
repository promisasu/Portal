'use strict';

/**
 * @module controller/handler/create-trial
 */

const boom = require('boom');
const database = require('../../model');

/**
 * Creates a new Trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
function createTrial (request, reply) {
    const trial = database.sequelize.model('trial');
    const stage = database.sequelize.model('stage');
    let newTrial = null;

    trial.create({
        name: request.payload.name,
        description: request.payload.description,
        IRBID: request.payload.IRBID,
        IRBStart: request.payload.IRBStart,
        IRBEnd: request.payload.IRBEnd,
        targetCount: request.payload.targetCount
    })
    .then((nTrial) => {
        newTrial = nTrial;
        const stagePromises = [];

        for (let index = 0; index < request.payload.stagecount; index += 1) {
            stagePromises.push(
                stage.create({name: request.payload.stageschedule})
            );
        }

        return Promise.all(stagePromises);
    })
    .then((newStages) => {
        return newTrial.addStages(newStages);
    })
    .then(() => {
        reply.redirect(`/trial/${newTrial.id}`);
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest('Invalid Trial'));
    });
}

module.exports = createTrial;
