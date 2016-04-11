'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test('when survey can be created', (t) => {
    const model = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return {
                addSurvey_instance () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('survey_template')
    .returns({
        findById () {
            return {
                addSurvey_instance () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('survey_instance')
    .returns({
        create () {
            return Promise.resolve();
        }
    });

    const createSurveyInstance = proxyquire('../helper/create-survey-instance', {
        '../../model': {
            sequelize: {
                model
            }
        }
    });

    const transaction = sinon.stub();

    t.notThrows(createSurveyInstance(1000, 1, new Date(), 1, 'day', transaction), 'it should resolve');
});

test('when patient is invalid', (t) => {
    const model = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return Promise.resolve(null);
        }
    });

    model
    .withArgs('survey_template')
    .returns({
        findById () {
            return Promise.resolve();
        }
    });

    model
    .withArgs('survey_instance')
    .returns({
        create () {
            return Promise.resolve();
        }
    });

    const createSurveyInstance = proxyquire('../helper/create-survey-instance', {
        '../../model': {
            sequelize: {
                model
            }
        }
    });

    t.throws(
        createSurveyInstance(NaN, 1, new Date(), 1, 'day', sinon.stub()),
        'patient does not exist',
        'it should reject'
    );
});

test('when survey template is invalid', (t) => {
    const model = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        findOne () {
            return Promise.resolve({});
        }
    });

    model
    .withArgs('survey_template')
    .returns({
        findById () {
            return Promise.resolve(null);
        }
    });

    model
    .withArgs('survey_instance')
    .returns({
        create () {
            return Promise.resolve({});
        }
    });

    const createSurveyInstance = proxyquire('../helper/create-survey-instance', {
        '../../model': {
            sequelize: {
                model
            }
        }
    });

    const transaction = sinon.stub();

    t.throws(
        createSurveyInstance(1000, NaN, new Date(), 1, 'day', transaction),
        'survey template does not exist',
        'it should reject'
    );
});
