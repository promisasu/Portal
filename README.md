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
4. run `npm run seed`
5. run `npm run user`

## Start the Portal

1. run `npm run start`

## Debug the Portal

* run `npm run status` to view status of all servers
* run `npm run log` to view server logs
* run `npm run describe-<system>` to view details of running of running a system, [tasks](#tasks) for more info

## Test the Portal

*Ensure that there is a database named `prp_test`*

1. run `npm run lint`
2. run `npm run test`

## View Code Documentation

1. run `npm run documentation`
2. open the `documentation` folder in a file explorer
3. open `index.html` in a browser

## Additional Guides

* [Contributing](.github/CONTRIBUTING.md)
* [Design](DESIGN.md)
* [Issue Template](.github/ISSUE_TEMPLATE.md)
* [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)

## Tasks

Tasks can be run by calling `npm run <task>`

* `check-dependencies` detect outdated and insecure packages
* `describe-api` view details of running api
* `describe-dashboard` view details of running dashboard
* `describe-scheduler` view details of running scheduler
* `documentation` generate code documentation
* `init` create a server configuration file
* `lint` lint check project files
* `lint-fix` auto fixes some lint errors
* `log` view server log
* `seed` fill database with sample data
* `start` start production api, dashboard, and scheduler
* `start-api` start production api
* `start-dashboard` start production dashboard
* `start-scheduler` start production scheduler
* `status` check production server status
* `stop` stop production api, dashboard, and scheduler
* `stop-api` stop production api
* `stop-dashboard` stop production dashboard
* `stop-scheduler` stop production scheduler
* `sync` synchronize database schema
* `test` run the test suite
* `user` create a new user
