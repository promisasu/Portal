'use strict';

const test = require('ava');
const processRules = require('../helper/process-rules');

test('when there is a single rule', (t) => {
    const rule = [1];
    const start = '01-01-2000';

    const end = processRules(rule, start);

    t.is(end, '01-02-2000', 'it should add the rule to start');
});

test('when there are a multiple rules', (t) => {
    const rule = [1, 2, 3];
    const start = '01-01-2000';

    const end = processRules(rule, start);

    t.is(end, '01-07-2000', 'it should add all the rules to start');
});

test('when there are no rules', (t) => {
    const rule = [];
    const start = '01-01-2000';

    const end = processRules(rule, start);

    t.is(end, '01-01-2000', 'it should have the same start and end');
});
