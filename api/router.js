'use strict';

const listTrials = require('./handler/list-trials');

module.exports = [
    {
        method: 'GET',
        path: '/api/trials',
        handler: listTrials
    }
];
