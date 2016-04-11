'use strict';

const test = require('ava');
const proxyquire = require('proxyquire');
const bcrypt = require('../../bcrypt-shim');
const comparePromise = proxyquire('../helper/compare-promise', {bcrypt});

test.cb('when values are the same', (t) => {
    comparePromise('test', 'test')
    .then((isValid) => {
        t.true(isValid, 'it should be valid');
        t.end();

        return;
    })
    .catch(() => {
        t.fail('it should not throw an exception');
        t.end();
    });
});

test.cb('when values are different', (t) => {
    comparePromise('test', 'not')
    .then((isValid) => {
        t.false(isValid, 'it should be invalid');
        t.end();

        return;
    })
    .catch(() => {
        t.fail('it should not throw an exception');
        t.end();
    });
});
