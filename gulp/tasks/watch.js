'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {

    gulp.watch('public/src/stylesheets/**/*.scss', ['styles']);
    gulp.watch('public/src/stylesheets/*.css', ['home-styles']);
    gulp.watch('public/src/scripts/**/*.js', ['scripts']);

    gulp.watch('public/src/stylesheets/partials/*.scss', ['styles']);
    gulp.watch('public/src/stylesheets/modules/*.scss', ['styles']);
    gulp.watch('public/src/scripts/essays/**/*.js', ['scripts']);
});
