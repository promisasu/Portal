#!/usr/bin/env node
'use strict';

const commandInit = require('./command/init');
const commandStart = require('./command/start');
const commandStop = require('./command/stop');
const commandSync = require('./command/sync');
const commandDev = require('./command/dev');
const version = require('./package.json').version;

// display command line interface
const argv = require('yargs')
    .usage('prp <command>')
    .command('init', 'create configuration file')
    .command('start', 'start server')
    .command('stop', 'stop server')
    .command('sync', 'creates database tables')
    .command('dev', 'start server in developer mode')
    .demand(1)
    .help('help')
    .alias('h', 'help')
    .version(version)
    .alias('v', 'version')
    .strict()
    .argv;

// translate commands into server actions
switch (argv._[0]) {
    case 'init':
        commandInit();
        break;
    case 'start':
        commandStart();
        break;
    case 'stop':
        commandStop();
        break;
    case 'sync':
        commandSync();
        break;
    case 'dev':
        commandDev();
        break;
    default:
        console.log('unknown command');
        console.log('to view valid commands run:');
        console.log('prp -h');
}
