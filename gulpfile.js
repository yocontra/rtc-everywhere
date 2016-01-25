'use strict';

var browserify = require('browserify'),
  vinyl_source_stream = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  //jscs = require('gulp-jscs'),
  //stylish = require('gulp-jscs-stylish'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  filelog = require('gulp-filelog'),
  header = require('gulp-header'),
  expect = require('gulp-expect-file'),
  fs = require('fs'),
  path = require('path'),

  PKG_INFO = require('./package.json'),
// Build filenames.
  BUILDS = {
    uncompressed: PKG_INFO.name + '.js',
    compressed: PKG_INFO.name + '.min.js'
  },
// gulp-header.
  BANNER = fs.readFileSync('banner.txt').toString(),
  BANNER_OPTS = {
    pkg: PKG_INFO,
    currentYear: (new Date()).getFullYear()
  },
// gulp-expect-file options.
  EXPECT_OPTS = {
    silent: true,
    errorOnFailure: true,
    checkRealFile: true
  },
  JS_FILES = ['gulpfile.js', 'index.js', 'lib/**/*.js', 'platforms/**/*.js', 'util/**/*.js'];


gulp.task('lint', function () {
  return gulp.src(JS_FILES)
    .pipe(jshint()) // enforce good practics
    //.pipe(jscs()) // enforce style guide
    //.pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('browserify', function () {
  return browserify([path.join(__dirname, PKG_INFO.main)], {
    standalone: PKG_INFO.name
  }).bundle()
    .pipe(vinyl_source_stream(PKG_INFO.name + '.js'))
    .pipe(filelog('browserify'))
    .pipe(buffer())// TODO: https://www.bountysource.com/issues/27516608-node-v4-2-1-throws-error-when-using-gulp-header
    .pipe(header(BANNER, BANNER_OPTS))
    .pipe(rename(BUILDS.uncompressed))
    .pipe(gulp.dest('dist/'));
});


gulp.task('uglify', function () {
  var src = 'dist/' + BUILDS.uncompressed;
  return gulp.src(src)
    .pipe(filelog('uglify'))
    .pipe(expect(EXPECT_OPTS, src))
    .pipe(uglify())
    .pipe(header(BANNER, BANNER_OPTS))
    .pipe(rename(BUILDS.compressed))
    .pipe(gulp.dest('dist/'));
});

gulp.task('devel', gulp.series('lint', 'browserify'));

gulp.task('dist', gulp.series('lint', 'browserify',	'uglify'));

gulp.task('default', gulp.series('dist'));
