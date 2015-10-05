'use strict';

/**
 * @module task/test
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');

/**
 * Checks that the Javascript code is valid.
 * @returns {Null} nothing
 */
function test () {
    return gulp.src(['*.js', 'model/**/*.js', 'presenter/**/*.js', 'task/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
}

test.description = 'Checks that the Javascript code is valid.';

module.exports = test;
