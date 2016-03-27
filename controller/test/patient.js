'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};
const httpNotFound = 404;

test.cb('when patient has one survey', (t) => {
    const query = sinon.stub();

    query
    .onFirstCall()
    .returns(Promise.resolve({
        pin: 1,
        stage: 'example'
    }));

    query
    .onSecondCall()
    .returns(Promise.resolve([
        {
            id: 1,
            startTime: new Date(),
            endTime: new Date(),
            userSubmissionTime: new Date(),
            state: 'completed',
            surveyTemplateId: 1,
            stageName: 'example',
            surveyTemplateName: 'example'
        }
    ]));

    query
    .onThirdCall()
    .returns(Promise.resolve({
        id: 1,
        name: 'example'
    }));

    const patientCSV = proxyquire('../handler/patient', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        }
    };

    const reply = {
        view: (template, data) => {
            t.is(template, 'patient', 'patient view should be rendered');
            t.true(data.surveys instanceof Array, 'surveys should be an Array');
            t.end();
        }
    };

    patientCSV(request, reply);
});

test.cb('when patient has no surveys', (t) => {
    const query = sinon.stub();

    query
    .onFirstCall()
    .returns(Promise.resolve({
        pin: 1,
        stage: 'example'
    }));

    query
    .onSecondCall()
    .returns(Promise.resolve([]));

    query
    .onThirdCall()
    .returns(Promise.resolve({
        id: 1,
        name: 'example'
    }));

    const patientCSV = proxyquire('../handler/patient', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        }
    };

    const reply = {
        view: (template, data) => {
            t.is(template, 'patient', 'patient view should be rendered');
            t.true(data.surveys instanceof Array, 'surveys should be an Array');
            t.end();
        }
    };

    patientCSV(request, reply);
});

test.cb('when patient does not exist', (t) => {
    const query = sinon.stub();

    query
    .onFirstCall()
    .returns(Promise.resolve(null));

    query
    .onSecondCall()
    .returns(Promise.resolve([]));

    query
    .onThirdCall()
    .returns(Promise.resolve(null));

    const patientCSV = proxyquire('../handler/patient', {
        '../../model': {
            sequelize: {query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            pin: 1
        }
    };

    const reply = {
        view: (template) => {
            t.is(template, '404', 'not found page should be rendered');

            return {
                code: (code) => {
                    t.is(code, httpNotFound);
                    t.end();
                }
            };
        }
    };

    patientCSV(request, reply);
});
