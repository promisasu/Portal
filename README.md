# Pain Reporting Portal

[![Build Status](https://travis-ci.org/promisasu/Portal.svg?branch=seed-task)](https://travis-ci.org/promisasu/Portal)
[![Dependency Status](https://david-dm.org/promisasu/Portal.svg)](https://david-dm.org/promisasu/Portal)
[![devDependency Status](https://david-dm.org/promisasu/Portal/dev-status.svg)](https://david-dm.org/promisasu/Portal#info=devDependencies)
[![optionalDependency Status](https://david-dm.org/promisasu/Portal/optional-status.svg)](https://david-dm.org/promisasu/Portal#info=optionalDependencies)

## Installation Instructions

1. install [Git](https://git-scm.com/downloads)
2. install [Node JS](https://nodejs.org/en/download/)
3. install [MySql](https://www.mysql.com/)
4. optionally install [Node Gyp](https://github.com/nodejs/node-gyp#installation) dependencies (strongly recommended)
5. clone git repository `git clone https://github.com/promisasu/Portal`
6. open the folder `cd Portal`
7. run `npm install`

## Setup Instructions

1. if you do not already have a database user, create one
2. create a new empty database `CREATE SCHEMA prp_development;`
3. run `npm run init`
4. run `npm run sync`
5. run `npm run user`

## Start the Portal

1. run `npm run start`

## Debug the Portal

* run `npm run status` to view status of all servers
* run `npm run log` to view server logs
* run `npm run describe-api` to view details of running api
* run `npm run desribe-dashboard` to view details of running dashboard

## Test the Portal

*Ensure that there is a database named `prp_test`*

1. run `npm run lint`
2. run `npm run test`

## View Code Documentation

1. run `npm run documentation`
2. open the `documentation` folder in a file explorer
3. open `index.html` in a browser

## Tasks

Tasks can be run by calling `npm run <task>`

* `describe-api` view details of running api
* `describe-dashboard` view details of running dashboard
* `documentation` generate code documentation
* `init` create a server configuration file
* `lint` lint check project files
* `log` view server log
* `outdated` view outdated server and browser packages
* `seed` fill database with sample data
* `start` start production dashboard and api
* `start-api` start production api
* `start-dashboard` start production dashboard
* `status` check production server status
* `stop` stop production dashboard and api
* `stop-api` stop production api
* `stop-dashboard` stop production dashboard
* `sync` synchronize database schema
* `test` run the test suite
* `user` create a new user
