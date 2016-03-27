'use strict';

const test = require('ava');
const comparePromise = require('../helper/compare-promise');

test('when values are the same', (t) => {
    t.notThrows(comparePromise('test', 'test'), 'it should resolve');
});

test('when values are different', (t) => {
    t.notThrows(comparePromise('test', 'not'), 'it should reject');
});
