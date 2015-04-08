'use strict';

var gulp 	= require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
    return connect.server({    	
        livereload: true
    });
});