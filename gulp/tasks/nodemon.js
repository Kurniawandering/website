'use strict';

var gulp 	= require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
	return nodemon({ script: './bin/www' });
});