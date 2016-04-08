'use strict';

const test = require('ava');
const deduplicate = require('../helper/deduplicate');

test('when properties are duplicated', (t) => {
    const data = [
        {
            property: 'one'
        },
        {
            property: 'one'
        }
    ];

    const properties = [
        'property'
    ];

    const result = deduplicate(data, properties);

    const expectedResult = [
        {
            property: 'one'
        },
        {
            property: ''
        }
    ];

    t.deepEqual(result, expectedResult, 'it should have only the first value');
});

test('when all values are unique', (t) => {
    const data = [
        {
            property: 'one'
        },
        {
            property: 'two'
        },
        {
            property: 'three'
        }
    ];

    const properties = [
        'property'
    ];

    const result = deduplicate(data, properties);

    t.deepEqual(data, result, 'it should have all the values');
});

test('when value is unique in multiple places', (t) => {
    const data = [
        {
            property: 'one'
        },
        {
            property: 'one'
        },
        {
            property: 'two'
        },
        {
            property: 'one'
        }
    ];

    const properties = [
        'property'
    ];

    const result = deduplicate(data, properties);

    const expectedResult = [
        {
            property: 'one'
        },
        {
            property: ''
        },
        {
            property: 'two'
        },
        {
            property: 'one'
        }
    ];

    t.deepEqual(result, expectedResult, 'it should keep second unique appearance');
});

test('when there missing properties', (t) => {
    const data = [
        {},
        {}
    ];

    const properties = [
        'property'
    ];

    const result = deduplicate(data, properties);

    const expectedResult = [
        {
            property: ''
        },
        {
            property: ''
        }
    ];

    t.deepEqual(result, expectedResult, 'it should enter an empty value');
});

test('when multiple properties are being deduplicated', (t) => {
    const data = [
        {
            one: 'abc',
            two: 'abc'
        },
        {
            one: 'abc',
            two: 'xyz'
        },
        {
            one: 'xyz',
            two: 'xyz'
        }
    ];

    const properties = [
        'one',
        'two'
    ];

    const result = deduplicate(data, properties);

    const expectedResult = [
        {
            one: 'abc',
            two: 'abc'
        },
        {
            one: '',
            two: 'xyz'
        },
        {
            one: 'xyz',
            two: ''
        }
    ];

    t.deepEqual(result, expectedResult, 'it should deduplicate each property independenty');
});

test('when multiple types of values are used', (t) => {
    const data = [
        {
            property: 'one'
        },
        {
            property: 'one'
        },
        {
            property: 1
        },
        {
            property: 1
        },
        {
            property: true
        },
        {
            property: true
        }
    ];

    const properties = [
        'property'
    ];

    const result = deduplicate(data, properties);

    const expectedResult = [
        {
            property: 'one'
        },
        {
            property: ''
        },
        {
            property: 1
        },
        {
            property: ''
        },
        {
            property: true
        },
        {
            property: ''
        }
    ];

    t.deepEqual(result, expectedResult, 'it should deduplicate any primitive type');
});
