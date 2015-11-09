'use strict';

const gulp = require('gulp');

const init = require('./task/init');
const startApi = require('./task/start-api');
const startDashboard = require('./task/start-dashboard');
const stopApi = require('./task/stop-api');
const stopDashboard = require('./task/stop-dashboard');
const sync = require('./task/sync');
const devApi = require('./task/dev-api');
const devDashboard = require('./task/dev-dashboard');
const lint = require('./task/lint');
const unit = require('./task/unit');
const syncTest = require('./task/syncTest');
const doc = require('./task/doc');

gulp.task(init);
gulp.task(startApi);
gulp.task(startDashboard);
gulp.task('start', gulp.series('startApi', 'startDashboard'));
gulp.task(stopApi);
gulp.task(stopDashboard);
gulp.task('stop', gulp.series('stopApi', 'stopDashboard'));
gulp.task(sync);
gulp.task(devApi);
gulp.task(devDashboard);
gulp.task(lint);
gulp.task(syncTest);
gulp.task(unit);
gulp.task('test', gulp.series('lint', 'syncTest', 'unit'));
gulp.task(doc);
