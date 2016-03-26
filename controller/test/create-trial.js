'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

/**
 * Mock sequelize
 * @returns {Object} mocked seqelize object
 */
function mockSequelize () {
    // stub properties
    const model = sinon.stub();
    const transaction = sinon.stub();

    // trial model
    model
    .onFirstCall()
    .returns({
        find: Promise.resolve({}),
        create: () => {
            return Promise.resolve({
                id: 1,
                addStages: () => {
                    return Promise.resolve();
                }
            });
        }
    });

    // stage model
    model
    .onSecondCall()
    .returns({
        find: Promise.resolve({}),
        create: () => {
            return Promise.resolve();
        }
    });

    transaction.returns(Promise.resolve({
        commit: sinon.stub(),
        rollback: sinon.stub()
    }));

    return {model, transaction};
}

test.cb('when a trial is created, redirect to new patient\'s information', (t) => {
    const sequelize = mockSequelize();

    const createTrial = proxyquire('../handler/create-trial', {
        boom: sinon.stub(),
        '../../model': {sequelize}
    });

    const fakeRequest = {
        payload: {
            name: 'test',
            description: 'test',
            IRBID: 'test',
            IRBStart: '2000-01-01',
            IRBEnd: '2001-01-01',
            targetCount: 10,
            stagecount: 3,
            stageName: 'one,two,three'
        }
    };

    const reply = () => {
        t.fail();
        t.end();
    };

    reply.redirect = (route) => {
        t.is(route, '/trial/1', 'correct redirect');
        t.end();
    };

    createTrial(fakeRequest, reply);
});

test.cb('when stage number does not match, fail', (t) => {
    const sequelize = mockSequelize();
    const boom = sinon.stub();

    boom.returns({name: 'Error'});

    const createTrial = proxyquire('../handler/create-trial', {
        boom,
        '../../model': {sequelize}
    });

    const request = {
        log: sinon.stub(),
        payload: {
            name: 'test',
            description: 'test',
            IRBID: 'test',
            IRBStart: '2000-01-01',
            IRBEnd: '2001-01-01',
            targetCount: 10,
            stagecount: 3,
            stageName: 'one,two'
        }
    };

    const reply = (data) => {
        t.is(typeof data, 'object');
        t.is(data.name, 'Error');
        t.end();
    };

    reply.redirect = () => {
        t.fail();
        t.end();
    };

    createTrial(request, reply);
});
