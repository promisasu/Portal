'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('welcome', {title: 'Pain Reporting Portal'});
        }
    }
];
