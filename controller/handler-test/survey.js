'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const QueryTypes = {
    SELECT: 'select'
};

test.cb('when the survey has not been completed', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('survey_instance')
    .returns({
        findById () {
            return Promise.resolve({
                id: 1,
                name: 'example',
                startTime: new Date(),
                endTime: new Date(),
                userSubmissionTime: null
            });
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([]));

    query
    .onSecondCall()
    .returns(Promise.resolve({
        pin: 1,
        id: 1,
        name: 'example'
    }));

    const survey = proxyquire('../handler/survey', {
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
            t.is(template, 'survey', 'it should render survey view');
            t.is(data.questions.length, 0, 'it should have no questions');
            t.end();
        }
    };

    survey(request, reply);
});

test.cb('when the survey has been completed', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('survey_instance')
    .returns({
        findById () {
            return Promise.resolve({
                id: 1,
                name: 'example',
                startTime: new Date(),
                endTime: new Date(),
                userSubmissionTime: null
            });
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([
        {
            questionOrder: 1,
            questionId: 1,
            questionText: 'example',
            optionId: 1,
            optionText: 'example'
        }
    ]));

    query
    .onSecondCall()
    .returns(Promise.resolve({
        pin: 1,
        id: 1,
        name: 'example'
    }));

    const survey = proxyquire('../handler/survey', {
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
            t.is(template, 'survey', 'it should render survey view');
            t.is(data.questions.length, 1, 'it should have one question');
            t.end();
        }
    };

    survey(request, reply);
});

test.cb('when survey does not exist', (t) => {
    const model = sinon.stub();
    const query = sinon.stub();

    model
    .withArgs('survey_instance')
    .returns({
        findById () {
            return Promise.resolve(null);
        }
    });

    query
    .onFirstCall()
    .returns(Promise.resolve([]));

    query
    .onSecondCall()
    .returns(Promise.resolve(null));

    const survey = proxyquire('../handler/survey', {
        '../../model': {
            sequelize: {model, query, QueryTypes}
        }
    });

    const request = {
        log: sinon.stub(),
        params: {
            id: Number.NaN
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

    survey(request, reply);
});
