'use strict';

const test = require('ava');
const groupBy = require('../helper/group-by');

test('when there is a single value', (t) => {
    const value = [
        {
            key: 1
        }
    ];
    const expected = [
        [
            {
                key: 1
            }
        ]
    ];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should produce a single group');
});

test('when there is a single unique value', (t) => {
    const value = [
        {
            key: 1
        },
        {
            key: 1
        }
    ];
    const expected = [
        [
            {
                key: 1
            },
            {
                key: 1
            }
        ]
    ];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should produce a single group');
});

test('when there are multiple unique values', (t) => {
    const value = [
        {
            key: 1
        },
        {
            key: 1
        },
        {
            key: 2
        },
        {
            key: 2
        }
    ];
    const expected = [
        [
            {
                key: 1
            },
            {
                key: 1
            }
        ],
        [
            {
                key: 2
            },
            {
                key: 2
            }
        ]
    ];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should produce multiple groups');
});

test('when there are no values', (t) => {
    const value = [];
    const expected = [];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should produce an empty array');
});

test('when group key is missing in elements', (t) => {
    const value = [
        {
            notKey: 1
        },
        {
            notKey: 2
        }
    ];
    const expected = [
        [
            {
                notKey: 1
            },
            {
                notKey: 2
            }
        ]
    ];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should group elements missing the key together');
});

test('when there are multiple types of values', (t) => {
    const value = [
        {
            key: 1
        },
        {
            key: 2
        },
        {
            key: '1'
        },
        {
            key: '2'
        },
        {
            key: true
        },
        {
            key: false
        }
    ];
    const expected = [
        [
            {
                key: 1
            }
        ],
        [
            {
                key: 2
            }
        ],
        [
            {
                key: '1'
            }
        ],
        [
            {
                key: '2'
            }
        ],
        [
            {
                key: true
            }
        ],
        [
            {
                key: false
            }
        ]
    ];

    t.deepEqual(groupBy(value, 'key'), expected, 'it should group elements only with same value and type');
});

test('when key is a number', (t) => {
    const value = [
        {
            1: 1
        }
    ];
    const expected = [
        [
            {
                1: 1
            }
        ]
    ];

    t.deepEqual(groupBy(value, 1), expected, 'it should produce a single group');
});

test('when items are arrays', (t) => {
    const value = [
        [
            1
        ],
        [
            1
        ],
        [
            2
        ],
        [
            2
        ]
    ];
    const expected = [
        [
            {
                0: 1
            },
            {
                0: 1
            }
        ],
        [
            {
                0: 2
            },
            {
                0: 2
            }
        ]
    ];

    t.deepEqual(groupBy(value, 0), expected, 'it should group based on array index');
});
