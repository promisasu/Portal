'use strict';

/**
 * @module task/dummyConfig
 * Writes a server configuration file.
 */

const path = require('path');
const read = require('./helper/read-promise');
const writeFile = require('./helper/write-file-promise');
const jsonIndent = 2;

const config = {};

config.opioid = {};
config.opioid.Tramadol = parseFloat('0.1');
config.opioid.Oxycodone = parseFloat('1.5');
config.opioid.Dilaudid = parseFloat('4');

writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify(config, null, jsonIndent));
