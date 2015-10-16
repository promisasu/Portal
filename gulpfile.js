'use strict';

const gulp = require('gulp');

const init = require('./task/init');
const start = require('./task/start');
const stop = require('./task/stop');
const sync = require('./task/sync');
const dev = require('./task/dev');
const lint = require('./task/lint');
const doc = require('./task/doc');

gulp.task(init);
gulp.task(start);
gulp.task(stop);
gulp.task(sync);
gulp.task(dev);
gulp.task(lint);
gulp.task(doc);
