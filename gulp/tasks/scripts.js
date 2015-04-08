'use strict';

var browserify  = require('browserify'),
    gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    uglify      = require('gulp-uglify'),
    merge       = require('merge-stream');

var basePath    = require('../config.js'),
    helper      = require('../helper.js');

gulp.task('scripts', function() {
    
    var folders = helper.getFolders(basePath.essays);
    
    var tasks = folders.map(function(folder){
        return browserify({ entries: [basePath.essays + folder + '/app.js']})
            .bundle()
            .pipe(source(folder))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rename({
                extname: '.js'
            }))
            .pipe(gulp.dest(basePath.dest + 'js/essays'));            
    });
    return merge(tasks);
});