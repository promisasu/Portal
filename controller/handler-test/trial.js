'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when there are no patients', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('trial')
    .returns({
        findById () {
            return Promise.resolve({
                name: 'example',
                description: 'example',
                IRBID: 1,
                IRBStart: new Date(),
                IRBEnd: new Date(),
                targetCount: 1,
                patientPinCounter: 1
            });
        }
    });

    model
    .withArgs('stage')
    .returns({
        findAll () {
            return Promise.resolve([]);
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([]));

    query
    .onSecondCall()
    .returns(Promise.resolve([]));

    query
    .onThirdCall()
    .returns(Promise.resolve([]));

    const trial = proxyquire('../handler/trial', {
        '../../model': {
            sequelize: {model, query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            id: 1
        }
    };

    const reply = {
        view (template, data) {
            t.is(template, 'trial', 'it should render the trial view');
            t.is(data.patients.length, 0, 'it should have no patients');
            t.is(data.complianceCount[0], 0, 'it should have no non-compliant patients');
            t.is(data.complianceCount[1], 0, 'it should have no semi-compliant patients');
            t.is(data.complianceCount[2], 0, 'it should have no compliant patients');
            t.end();
        }
    };

    trial(request, reply);
});

test.cb('when there is one patient', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('trial')
    .returns({
        findById () {
            return Promise.resolve({
                name: 'example',
                description: 'example',
                IRBID: 1,
                IRBStart: new Date(),
                IRBEnd: new Date(),
                targetCount: 1,
                patientPinCounter: 1
            });
        }
    });

    model
    .withArgs('stage')
    .returns({
        findAll () {
            return Promise.resolve([]);
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([
        {
            pin: 1,
            name: 'example'
        }
    ]));

    query
    .onSecondCall()
    .returns(Promise.resolve([
        {
            id: 1,
            pin: 1001,
            completedCount: 1,
            expiredCount: 0
        }
    ]));

    query
    .onThirdCall()
    .returns(Promise.resolve([]));

    const trial = proxyquire('../handler/trial', {
        '../../model': {
            sequelize: {model, query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            id: 1
        }
    };

    const reply = {
        view (template, data) {
            t.is(template, 'trial', 'it should render the not found view');
            t.is(data.patients.length, 1, 'it should have one patient');
            t.is(data.complianceCount[0], 0, 'it should have no non-compliant patients');
            t.is(data.complianceCount[1], 0, 'it should have no semi-compliant patients');
            t.is(data.complianceCount[2], 1, 'it should have one compliant patient');
            t.end();
        }
    };

    trial(request, reply);
});

test.cb('when trial does not exist', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('trial')
    .returns({
        findById () {
            return Promise.resolve(null);
        }
    });

    model
    .withArgs('stage')
    .returns({
        findAll () {
            return Promise.resolve([]);
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([]));

    query
    .onSecondCall()
    .returns(Promise.resolve([]));

    query
    .onThirdCall()
    .returns(Promise.resolve([]));

    const trial = proxyquire('../handler/trial', {
        '../../model': {
            sequelize: {model, query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            id: 1
        }
    };

    const reply = {
        view (template, data) {
            t.is(template, '404', 'it should render not found view');
            t.is(data.title, 'Not Found', 'it should have page title \'Not Found\'');

            return {
                code (code) {
                    t.is(code, 404, 'it should have not found status code');
                    t.end();
                }
            };
        }
    };

    trial(request, reply);
});
