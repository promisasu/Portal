# Pain Reporting Portal

[![Build Status](https://travis-ci.org/promisasu/Portal.svg?branch=seed-task)](https://travis-ci.org/promisasu/Portal)
[![Dependency Status](https://david-dm.org/promisasu/Portal.svg)](https://david-dm.org/promisasu/Portal)
[![devDependency Status](https://david-dm.org/promisasu/Portal/dev-status.svg)](https://david-dm.org/promisasu/Portal#info=devDependencies)

## Installation Instructions

1. install [Git](https://git-scm.com/downloads)
2. install [Node JS](https://nodejs.org/en/download/)
3. install [MySql](https://www.mysql.com/)
4. install [Node Gyp](https://github.com/nodejs/node-gyp#installation) dependencies
5. clone git repository `git clone https://github.com/promisasu/Portal`
6. open the folder `cd Portal`
7. run `npm install`

## Setup Instructions

1. if you do not already have a database user, create one
2. create a new empty database `CREATE SCHEMA portal_development;`
3. run `npm run init`
4. run `npm run sync`
5. run `npm run user`

## Start the Portal

1. run `npm run start`

## Test the Portal

*Ensure that there is a database named `portal_test`*

1. run `npm run test`

## View Code Documentation

1. run `npm run documentation`
2. open `documentation/index.html` in a browser

## NPM Tasks

Tasks can be run by calling `npm run <task>`

* `dev-api` start api in developer mode
* `dev-dashboard` start dashboard in developer mode
* `documentation` generate code documentation
* `init` create a server configuration file
* `lint` lint check project files
* `seed` fill database with sample data
* `start` start production dashboard and api
* `start-api` start production api
* `start-dashboard` start production dashboard
* `stop` stop production dashboard and api
* `stop-api` stop production api
* `stop-dashboard` stop production dashboard
* `sync` syncronize database schema
* `test` run the test suite
* `user` create a new user
