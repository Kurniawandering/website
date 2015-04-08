var gulp 		= require('gulp'),
    gutil       = require('gulp-util'),
	requireDir 	= require('require-dir');

var helper      = require('./gulp/helper.js');

requireDir('./gulp/tasks', { recurse: true });

if (gutil.env.essays) {
    helper.installEssay(gutil.env.essays);
}

gulp.task('build', ['styles', 'scripts']);
gulp.task('default', ['build', 'connect', 'watch', 'nodemon']);