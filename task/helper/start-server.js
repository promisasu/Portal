'use strict';

const config = require('../../config.json');
const server = require('../../server')(config);

// start the server
server.start(() => {
    console.log('Server running at:', server.info.uri);
});
