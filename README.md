# Pain Reporting Portal

[![Build Status](https://travis-ci.org/promisasu/Portal.svg?branch=seed-task)](https://travis-ci.org/promisasu/Portal)
[![Dependency Status](https://david-dm.org/promisasu/Portal.svg)](https://david-dm.org/promisasu/Portal)
[![devDependency Status](https://david-dm.org/promisasu/Portal/dev-status.svg)](https://david-dm.org/promisasu/Portal#info=devDependencies)
[![optionalDependency Status](https://david-dm.org/promisasu/Portal/optional-status.svg)](https://david-dm.org/promisasu/Portal#info=optionalDependencies)
[![Taiga Board](https://img.shields.io/badge/managed_with-taiga-brightgreen.svg)](https://tree.taiga.io/project/promisasu-prp-manhattan-project/)

## About

The pain reporting portal is de-identified patient and survey management system.
It allows clinicians to schedule digital surveys to be delivered to patients.
As well as allowing clinicians to monitor patient responses to look for possible interventions.

## Installation Instructions

1. install [Git](https://git-scm.com/downloads)
2. install [Node JS](https://nodejs.org/en/download/)
3. install [MySql](https://www.mysql.com/)
4. optionally install [Node Gyp](https://github.com/nodejs/node-gyp#installation) dependencies (strongly recommended)
5. clone git repository `git clone https://github.com/promisasu/Portal`
6. open the folder `cd Portal`
7. run `npm install`

## Setup Instructions

1. The portal uses the same database as the CNMC PROMIS Application. Please ensure that you have the correct and latest        schema. You can find the schema with some sample data in the database folder of this repository.
   For full dump, please contact the developers or refer to the dropbox.
2. run `npm run init`
3. run `npm run user`. This command sets up the user who gains access to the portal once it's deployed.
4. Connect to the local MySQL server and run the command `set GLOBAL sql_mode="";`

## Start the Portal

1. run `npm run start`

## Debug the Portal

* run `npm run status` to view status of all servers
* run `npm run log` to view server logs

## Test the Portal

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

* `check` detect outdated or insecure packages
* `documentation` generate code documentation
* `init` create a server configuration file
* `lint` lint check project files
* `lint-fix` auto fixes some lint errors
* `log` view server logs
* `start` start all services
* `start-dashboard` start dashboard service
* `start-scheduler` start scheduler service
* `status` check service statuses
* `stop` stop all services
* `stop-dashboard` stop dashboard service
* `stop-scheduler` stop scheduler service
* `sync` synchronize database schema
* `test` run the test suite
* `user` create a new user
* `validate` detect invalid server configuration

##Opioid Equivalance
Regarding the new chart that includes opiod equivalence

[1:43] 
Zena says to use this calculator: http://www.globalrph.com/narcotic.cgi
globalrph.com
Opioid - Narcotic - Converter
opioid converter

[1:43] 
she will also send me a paper.

[1:43] 
When putting in values, Hydromorphone == Dilaudid, and Percocet == Oxycodone

[1:44] 
We already have an Oxycodone, so we will basically map that and Percocet to the same thing dosage wise.

[1:44] 
Tramadol is also in this calculator. Our other meds (Ibuprofen, Tylenol w/ codeine, naprosyn) can be ignored for this

[1:44] 
Step 3 should be left at 0%

[1:45] 
Step 4 - the “Converting To:” should be Morphine

[1:45] 
Step 1 and Step 4 should use “Oral” not “IV/IM/SC” values

[1:46] 
If we plug in 2-3 different values for each medication we will see what the multiplier is, and can replicate in our code.
