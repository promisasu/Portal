'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

/**
 * Mock sequelize
 * @returns {Object} mocked sequelize object
 */
function mockSequelize () {
    // stub properties
    const model = sinon.stub();
    const transaction = sinon.stub();

    model
    .withArgs('trial')
    .returns({
        find () {
            return Promise.resolve({});
        },
        create () {
            return Promise.resolve({
                id: 1,
                addStages () {
                    return Promise.resolve();
                }
            });
        }
    });

    model
    .withArgs('stage')
    .returns({
        find () {
            return Promise.resolve({});
        },
        create () {
            return Promise.resolve();
        }
    });

    transaction.returns(Promise.resolve({
        commit: sinon.stub(),
        rollback: sinon.stub()
    }));

    return {model, transaction};
}

test.cb('when a trial is created', (t) => {
    const sequelize = mockSequelize();

    const createTrial = proxyquire('../handler/create-trial', {
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
            stageName: 'one,two,three'
        }
    };

    const reply = {
        redirect (route) {
            t.is(route, '/trial/1', 'it should redirect to the new trial');
            t.end();
        }
    };

    createTrial(request, reply);
});

test.cb('when stage number does not match', (t) => {
    const sequelize = mockSequelize();

    const createTrial = proxyquire('../handler/create-trial', {
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
        t.is(data.name, 'Error', 'it should have an Error object');
        t.end();
    };

    createTrial(request, reply);
});
