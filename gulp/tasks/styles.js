'use strict';

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    connect         = require('gulp-connect'),
    rename          = require('gulp-rename');

gulp.task('styles', ['clean'], function() {

    return gulp.src('public/src/stylesheets/essays.scss')
        .pipe(sass({ style: 'expanded', includePaths: ['public/src/stylesheets/modules'] }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({suffix: '.base'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/css/essays'))
        .pipe(connect.reload());
});