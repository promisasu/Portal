'use strict';

/**
 * @module task/init
 * Writes a server configuration file.
 */

const path = require('path');
const read = require('./helper/read-promise');
const writeFile = require('./helper/write-file-promise');
const genSalt = require('./helper/gen-salt-promise');
const numberOfHashIterations = 10;
const jsonIndent = 2;

const config = {};

console.log('This utility will walk you through creating a config.json file.');
console.log('It only covers the most common items, and tries to guess sensible defaults.');
console.log('');
console.log('general setup for project');
console.log('');

read({
    prompt: 'environment name:',
    default: 'development'
})
.then((environment) => {
    config.environment = environment;

    console.log('');
    console.log('setup for pain reporting portal server');
    console.log('');

    return read({
        prompt: 'hostname:',
        default: 'localhost'
    });
})
.then((serverHostname) => {
    config.dashboard = {};
    config.dashboard.hostname = serverHostname;

    return read({
        prompt: 'port number:',
        default: 3000
    });
})
.then((port) => {
    config.dashboard.port = parseInt(port);

    return;
})
.then(() => {
    console.log('');
    console.log('setup for pain reporting portal database');
    console.log('');

    return read({
        prompt: 'hostname:',
        default: 'localhost'
    });
})
.then((databaseHostname) => {
    config.database = {};
    config.database.hostname = databaseHostname;

    return read({
        prompt: 'database name:',
        default: 'prp_development'
    });
})
.then((databaseName) => {
    config.database.name = databaseName;

    return read({
        prompt: 'username:',
        default: 'developer'
    });
})
.then((databaseUsername) => {
    config.database.username = databaseUsername;

    return read({
        prompt: 'password:',
        default: 'password'
    });
})
.then((databasePassword) => {
    config.database.password = databasePassword;

    return read({
        prompt: 'SQL server:',
        default: 'mysql'
    });
})
.then((dialect) => {
    config.database.dialect = dialect;

    return genSalt(numberOfHashIterations);
})
.then((salt) => {
    config.database.salt = salt;

    return read({
        prompt: 'Web Form Post URL:',
        default: 'http://swent1linux.asu.edu:8082/v311/rest/patients/enrollpatient'
    });
})
.then((formPostURL) => {
    config.webFormPostUrl = formPostURL;

    return read({
        prompt: 'API Url for the web app:',
        default: 'http://swent1linux.asu.edu:8082/api'
    });
})
.then((apiURL) => {
    config.apiURL = apiURL;

    return read({
        prompt: 'Opioid conversion factor for Tramadol:',
        default: 0.1
    });
})
.then((tramadol) => {
    config.opioid = {};
    config.opioid.Tramadol = parseFloat(tramadol);

    return read({
        prompt: 'Opioid conversion factor for Oxycodone:',
        default: 1.5
    });
})
.then((oxycodone) => {
    config.opioid.Oxycodone = parseFloat(oxycodone);

    return read({
        prompt: 'Opioid conversion factor for Hydromorphone:',
        default: 4
    });
})
.then((hydromorphone) => {
    config.opioid.Dilaudid = parseFloat(hydromorphone);

    // Gotta get rid of these dependencies in the near future
    config.api = {};
    config.api.hostname = 'localhost';
    config.api.port = 3001;

    return writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, jsonIndent));
})
.catch((err) => {
    console.error(err);
});
