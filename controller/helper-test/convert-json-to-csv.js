'use strict';

const test = require('ava');
const convertJsonToCsv = require('../helper/convert-json-to-csv');

test('when there is a label and a key', (t) => {
    const json = [
        {
            one: 'a1',
            two: 'b1'
        },
        {
            one: 'a2',
            two: 'b2'
        }
    ];

    const options = [
        {
            label: 'example 1',
            key: 'one'
        },
        {
            label: 'example 2',
            key: 'two'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'example 1,example 2\n"a1","b1"\n"a2","b2"', 'it should have the labels and the values in order');
});

test('when there are commas in the values', (t) => {
    const json = [
        {
            one: 'a,b,c,,'
        },
        {
            one: ',,,,,,,'
        }
    ];

    const options = [
        {
            label: 'value',
            key: 'one'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'value\n"a,b,c,,"\n",,,,,,,"', 'it should wrap values in double quotes');
});

test('when there are missing or falsy values', (t) => {
    const json = [
        {
            one: null
        },
        {},
        {
            one: false
        },
        {
            one: 'value'
        }
    ];

    const options = [
        {
            label: 'one',
            key: 'one',
            default: 'default'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'one\n"default"\n"default"\n"default"\n"value"', 'it should replace falsy values with default');
});

test('when columns are filtered', (t) => {
    const json = [
        {
            wanted: 'value 1',
            unwanted: 'value 2'
        },
        {
            wanted: 'string 1',
            unwanted: 'string 2'
        }
    ];

    const options = [
        {
            label: 'column',
            key: 'wanted'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'column\n"value 1"\n"string 1"', 'it should keep only requested column');
});

test('when order is changed', (t) => {
    const json = [
        {
            one: 'one one',
            two: 'two one'
        },
        {
            one: 'one two',
            two: 'two two'
        }
    ];

    const options = [
        {
            label: 'two',
            key: 'two'
        },
        {
            label: 'one',
            key: 'one'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'two,one\n"two one","one one"\n"two two","one two"', 'it should keep option order');
});

test('when different different value types are used', (t) => {
    const json = [
        {
            value: 'string'
        },
        {
            value: 1
        },
        {
            value: true
        },
        {
            value: {}
        }
    ];

    const options = [
        {
            label: 'value',
            key: 'value'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'value\n"string"\n"1"\n"true"\n"[object Object]"', 'it should display all primitives');
});

test('when a column is duplicated', (t) => {
    const json = [
        {
            value: 'one'
        },
        {
            value: 'two'
        }
    ];

    const options = [
        {
            label: 'one',
            key: 'value'
        },
        {
            label: 'two',
            key: 'value'
        }
    ];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, 'one,two\n"one","one"\n"two","two"', 'it should duplicate column');
});

test('when json is empty', (t) => {
    const json = [];
    const options = [];

    const csv = convertJsonToCsv(json, options);

    t.is(csv, '\n', 'it should be empty');
});
