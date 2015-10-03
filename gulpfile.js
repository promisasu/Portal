'use strict';

const gulp = require('gulp');

const init = require('./task/init');
const start = require('./task/start');
const stop = require('./task/stop');
const sync = require('./task/sync');
const dev = require('./task/dev');
const test = require('./task/test');
const doc = require('./task/doc');

gulp.task(init);
gulp.task(start);
gulp.task(stop);
gulp.task(sync);
gulp.task(dev);
gulp.task(test);
gulp.task(doc);
