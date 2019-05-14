'use strict';

const isDev = true;

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

gulp.task('styles', function() {
  return gulp.src('./sass/style.scss')
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.csso())
        .pipe($.if(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest('.'))
});

gulp.task('js', function() {
  return gulp.src('./js/dev/*.js')
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.concat('scripts.js'))
        .pipe($.minify())
        .pipe(gulp.dest('./js'))
});

gulp.task('build:all', gulp.series('styles', 'js'));

gulp.watch('./sass/**/*.*', gulp.series('styles'));
gulp.watch('./js/dev/*.*', gulp.series('js'));