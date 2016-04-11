'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test.cb('when patient is created', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();
    const createSurveyInstance = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        create () {
            return {
                pin: 1001
            };
        }
    });

    model
    .withArgs('trial')
    .returns({
        findById () {
            return {
                id: 1,
                patientPinCounter: 1,
                increment () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('stage')
    .returns({
        findById () {
            return {
                addPatient () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('join_stages_and_surveys')
    .returns({
        findOne () {
            return {
                rule: 'weekly',
                surveyTemplateId: 1
            };
        }
    });

    transaction.returns(Promise.resolve({
        commit () {
            return Promise.resolve();
        }
    }));

    createSurveyInstance.returns(Promise.resolve());

    const createPatient = proxyquire('../handler/create-patient', {
        '../../model': {
            sequelize: {
                model,
                transaction
            }
        },
        '../helper/create-survey-instance': createSurveyInstance
    });

    const request = {
        log: sinon.stub(),
        payload: {
            stageId: 1,
            startDate: new Date(),
            endDate: new Date()
        }
    };

    const reply = {
        redirect (path) {
            t.is(path, '/patient/1001?newPatient=true', 'it should redirect to new patient view');
            t.end();
        }
    };

    createPatient(request, reply);
});

test.cb('when trial does not exist', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();
    const createSurveyInstance = sinon.stub();

    model.withArgs('patient').returns();

    model
    .withArgs('trial')
    .returns({
        findById () {
            return Promise.reject();
        }
    });

    model.withArgs('stage').returns();

    model.withArgs('join_stages_and_surveys').returns();

    transaction.returns(Promise.resolve({
        rollback () {
            return Promise.resolve();
        }
    }));

    const createPatient = proxyquire('../handler/create-patient', {
        '../../model': {
            sequelize: {
                model,
                transaction
            }
        },
        '../helper/create-survey-instance': createSurveyInstance
    });

    const request = {
        log: sinon.stub(),
        payload: {
            stageId: 1,
            startDate: new Date(),
            endDate: new Date()
        }
    };

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have an Error object');
        t.end();
    };

    createPatient(request, reply);
});

test.cb('when stage does not exist', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();
    const createSurveyInstance = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        create () {
            return {
                pin: 1001
            };
        }
    });

    model
    .withArgs('trial')
    .returns({
        findById () {
            return {
                id: 1,
                patientPinCounter: 1,
                increment () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('stage')
    .returns({
        findById () {
            return Promise.reject();
        }
    });

    model.withArgs('join_stages_and_surveys').returns();

    transaction.returns(Promise.resolve({
        rollback () {
            return Promise.resolve();
        }
    }));

    createSurveyInstance.returns(Promise.resolve());

    const createPatient = proxyquire('../handler/create-patient', {
        '../../model': {
            sequelize: {
                model,
                transaction
            }
        },
        '../helper/create-survey-instance': createSurveyInstance
    });

    const request = {
        log: sinon.stub(),
        payload: {
            stageId: 1,
            startDate: new Date(),
            endDate: new Date()
        }
    };

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have an Error object');
        t.end();
    };

    createPatient(request, reply);
});

test.cb('when no initial survey is availible for stage', (t) => {
    const model = sinon.stub();
    const transaction = sinon.stub();
    const createSurveyInstance = sinon.stub();

    model
    .withArgs('patient')
    .returns({
        create () {
            return {
                pin: 1001
            };
        }
    });

    model
    .withArgs('trial')
    .returns({
        findById () {
            return {
                id: 1,
                patientPinCounter: 1,
                increment () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('stage')
    .returns({
        findById () {
            return {
                addPatient () {
                    return Promise.resolve();
                }
            };
        }
    });

    model
    .withArgs('join_stages_and_surveys')
    .returns({
        findOne () {
            return {
                rule: 'weekly',
                surveyTemplateId: 1
            };
        }
    });

    transaction.returns(Promise.resolve({
        rollback () {
            return Promise.resolve();
        }
    }));

    createSurveyInstance.returns(Promise.reject());

    const createPatient = proxyquire('../handler/create-patient', {
        '../../model': {
            sequelize: {
                model,
                transaction
            }
        },
        '../helper/create-survey-instance': createSurveyInstance
    });

    const request = {
        log: sinon.stub(),
        payload: {
            stageId: 1,
            startDate: new Date(),
            endDate: new Date()
        }
    };

    const reply = (data) => {
        t.is(data.name, 'Error', 'it should have an Error object');
        t.end();
    };

    createPatient(request, reply);
});
