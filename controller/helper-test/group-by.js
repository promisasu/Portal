'use strict';

const test = require('ava');
const groupBy = require('../helper/group-by');

test('when function is an alias', (t) => {
    t.is(typeof groupBy, 'function', 'it should be a function');
});
