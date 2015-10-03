'use strict';

/**
 * @module task/doc
 */

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc');

/**
 * Turns documentation comments into viewable wep pages.
 * @function doc
 * @returns {Pipe} Gulp Pipeline
 */
function doc () {
    return gulp
        .src(['model/*.js', 'presenter/*.js', 'task/*.js'])
        .pipe(jsdoc('./documentation'));
}

doc.description = 'Turns documentation comments into viewable wep pages.';

module.exports = doc;
