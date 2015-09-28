#!/usr/bin/env node
'use strict';

const restify = require('restify');
const version = require('./package.json').version;

const argv = require('yargs')
    .usage('prp [options]')
    .option('p', {
        alias: 'port',
        default: 3000,
        describe: 'port to run server on'
    })
    .help('help')
    .alias('h', 'help')
    .version(version)
    .alias('v', 'version')
    .argv;

const server = restify.createServer();

server.get('/', function (req, res, next) {
    res.send('hello world');
    next();
});

server.listen(argv.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
