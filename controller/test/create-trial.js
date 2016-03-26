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

test.cb('trial can be created', (t) => {
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

    /**
     * reply should fail, redirect should pass
     * @returns {Null} nothing
     */
    function failingReply () {
        t.fail();
        t.end();
    }

    failingReply.redirect = (route) => {
        t.is(route, '/trial/1', 'correct redirect');
        t.end();
    };

    createTrial(fakeRequest, failingReply);
});

test.cb('invalid number of stages should fail', (t) => {
    const sequelize = mockSequelize();

    const createTrial = proxyquire('../handler/create-trial', {
        boom: sinon.stub(),
        '../../model': {sequelize}
    });

    const fakeRequest = {
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

    /**
     * reply should pass, redirect should fail
     * @returns {Null} nothing
     */
    function passingReply () {
        t.pass();
        t.end();
    }

    passingReply.redirect = () => {
        t.fail();
        t.end();
    };

    createTrial(fakeRequest, passingReply);
});
