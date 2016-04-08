'use strict';

const test = require('ava');
const processRules = require('../helper/process-rules');

test('when there is a single rule', (t) => {
    const rule = [1];
    const start = '2000-01-01';

    const end = processRules(rule, start);

    t.is(end, '2000-01-02', 'it should add the rule to start');
});

test('when there are a multiple rules', (t) => {
    const rule = [1, 2, 3];
    const start = '2000-01-01';

    const end = processRules(rule, start);

    t.is(end, '2000-01-07', 'it should add all the rules to start');
});

test('when there are no rules', (t) => {
    const rule = [];
    const start = '2000-01-01';

    const end = processRules(rule, start);

    t.is(end, '2000-01-01', 'it should have the same start and end');
});
