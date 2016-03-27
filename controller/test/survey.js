'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const zero = 0;
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
            t.is(data.questions.length, zero, 'it should have no questions');
            t.end();
        }
    };

    survey(request, reply);
});
