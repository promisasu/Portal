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
    let transaction = null;

    database
    .sequelize
    .transaction()
    .then((newTransaction) => {
        transaction = newTransaction;

        return trial.create({
            name: request.payload.name,
            description: request.payload.description,
            IRBID: request.payload.IRBID,
            IRBStart: request.payload.IRBStart,
            IRBEnd: request.payload.IRBEnd,
            targetCount: request.payload.targetCount
        }, {transaction});
    })
    .then((nTrial) => {
        newTrial = nTrial;
        const stagePromises = [];
        const stageNames = request
            .payload
            .stageName
            .split(',');

        if (stageNames.length !== request.payload.stagecount) {
            throw new Error('No of Stages not matched with Stage Schedule information given');
        }
        for (const name of stageNames) {
            stagePromises.push(
                stage.create({name}, {transaction})
            );
        }

        return Promise.all(stagePromises);
    })
    .then((newStages) => {
        return newTrial.addStages(newStages, {transaction});
    })
    .then(() => {
        return transaction.commit();
    })
    .then(() => {
        return reply.redirect(`/trial/${newTrial.id}`);
    })
    .catch((err) => {
        transaction.rollback();
        request.log('error', err);
        reply(boom.badRequest('Invalid Trial'));
    });
}

module.exports = createTrial;
