# Design

The Pain Reporting Portal consists of 5 major pieces.

1. [Dashboard](#dashboard)
2. [API](#api)
3. [CLI](#api)
4. [Rules Engine](#rules-engine)
5. [Schedule Job](#schedule-job)

## Dashboard

The dashboard is a website that allows medical researchers to manage clinical trials.
Providing up-to-date information on patient participation.

The dashboard is organized using the [MVC pattern](https://en.wikipedia.org/wiki/Model–view–controller).
It leverages [Sequelize](http://docs.sequelizejs.com/) to power the model, [Hapi](http://hapijs.com/) to provide
 controller services, and [Handlebars](http://handlebarsjs.com/) to render the views.

**Relevant Folders**

``` sh
controller
model
view
```

## API

The API is a [RESTful service](https://en.wikipedia.org/wiki/Representational_state_transfer) that powers the
application that patients use to complete surveys.

The API leverages the same model used by the dashboard, and sends survey information to the companion application in
JSON format. The model is powered by [Sequelize](http://docs.sequelizejs.com/) and the API is handled by
[Hapi](http://hapijs.com/).

**Relevant Folders**

``` sh
api
view
```

## CLI

The CLI is a collection of tools to help administrators and developers manage all the Pain Reporting Portal components.

The CLI leverages [NPM](https://docs.npmjs.com/misc/scripts) for running tasks,
[ESLint](http://eslint.org/) for lint checking,
[AVA](https://github.com/sindresorhus/ava) for testing,
[JSDoc](https://github.com/jsdoc3/jsdoc) for documentation,
[Bower](http://bower.io/) to manage UI libraries,
and [PM2](http://pm2.keymetrics.io/) for production server management.

**Relevant File and Folder**

``` sh
package.json
task
```

## Rules Engine

**Current**

Rules are a description of a schedule.
Surveys can be generated on a daily or weekly basis.
Rules can be given priority in order to resolve conflicts on days that satisfy multiple rules.

**Future**

Rules will implement an [expert system](https://en.wikipedia.org/wiki/Expert_system) to determine when surveys should be
generated.
The expert system will combine schedule information, the scores from past surveys, and answers to individual questions
from past surveys to make its decisions.

**Relevant File**

``` sh
rule/task/run-survey-rules.js
```

## Schedule Job

The Scheduler uses [PM2](http://pm2.keymetrics.io/) `cron restart` to run the rules on a timer.

**Relevant File**

``` sh
task/start-scheduler.json
```
