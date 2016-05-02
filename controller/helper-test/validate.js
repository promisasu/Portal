'use strict';

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

test.cb('when user exists and password is correct', (t) => {
    const model = sinon.stub();
    const compare = sinon.stub();

    const user = {
        username: 'example',
        passwordHash: 'example'
    };

    model
    .withArgs('user')
    .returns({
        find () {
            return Promise.resolve(user);
        }
    });

    compare.returns(Promise.resolve(true));

    const validate = proxyquire('../helper/validate', {
        '../../model': {
            sequelize: {model}
        },
        './compare-promise': compare
    });

    const request = null;
    const username = 'example';
    const password = 'example';
    const callback = (err, isValid, userCopy) => {
        t.ifError(err, 'it should not have an error');
        t.true(isValid, 'it should be a valid login');
        t.deepEqual(user, userCopy, 'it should have user details');
        t.end();
    };

    validate(request, username, password, callback);
});

test.cb('when user exists and password is incorrect', (t) => {
    const model = sinon.stub();
    const compare = sinon.stub();

    const user = {
        username: 'example',
        passwordHash: 'example'
    };

    model
    .withArgs('user')
    .returns({
        find () {
            return Promise.resolve(user);
        }
    });

    compare.returns(Promise.resolve(false));

    const validate = proxyquire('../helper/validate', {
        '../../model': {
            sequelize: {model}
        },
        './compare-promise': compare
    });

    const request = null;
    const username = 'example';
    const password = 'not right';
    const callback = (err, isValid, userCopy) => {
        t.ifError(err, 'it should not have an error');
        t.false(isValid, 'it should be a invalid login');
        t.deepEqual(user, userCopy, 'it should have user details');
        t.end();
    };

    validate(request, username, password, callback);
});

test.cb('when user does not exist', (t) => {
    const model = sinon.stub();

    model
    .withArgs('user')
    .returns({
        find () {
            return Promise.resolve(null);
        }
    });

    const validate = proxyquire('../helper/validate', {
        '../../model': {
            sequelize: {model}
        }
    });

    const request = {
        log: sinon.stub()
    };
    const username = 'example';
    const password = 'example';
    const callback = (err, isValid, user) => {
        t.true(err === null, 'it shound not have an error');
        t.false(isValid, 'it should be a invalid login');
        t.is(user, null, 'it should not have any user infomation');
        t.end();
    };

    validate(request, username, password, callback);
});
