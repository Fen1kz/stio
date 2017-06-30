'use strict';

import './globals';

const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const watch = require('gulp-watch');

const path = require('path');
const webpack = require('webpack');

let watching = false;

const TEST_PATH_WATCH = '{shared,server,client,test}/**/*.js*(x)';
const TEST_PATH_SHARED = ['shared/**/*.spec.js'];
const TEST_PATH_SERVER = ['.tmp/server.bundle.js'];
const TEST_PATH_CLIENT = ['client/**/*.spec.js', 'client/**/*.spec.jsx'];

let serverCompiler;
const getServerCompiler = () => {
  if (!serverCompiler) serverCompiler = webpack(require('./webpack.test.babel'));
  return serverCompiler;
};


const testWatch = (paths) => gulp.src(paths)
  .pipe(mocha({
    bail: true
    , require: ['source-map-support/register', 'ignore-styles']
    // , require: ['source-map-support/register', 'ignore-styles', './shared/test-helper.js']
  }))
  .on('error', function (e) {
    gutil.log(e);
    this.emit('end');
  });

gulp.task('test:setup', () => {
  watching = true;
  process.env.TEST = true;
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'secret';
});

gulp.task('test:server:compile', ['test:setup'], (cb) => {
  getServerCompiler().run(cb);
});

gulp.task('test:shared:single', ['test:setup', 'test:webpack:compile'], () => testWatch(TEST_PATH_SHARED));
gulp.task('test:shared', ['test:shared:single'], () => gulp.watch(TEST_PATH_WATCH, ['test:shared:single']));

gulp.task('test:server:single', ['test:server:compile'], () => testWatch(TEST_PATH_SERVER));
gulp.task('test:server', ['test:server:single'], () => gulp.watch(TEST_PATH_WATCH, ['test:server:single']));

gulp.task('test:client:single', ['test:setup'], () => testWatch(TEST_PATH_CLIENT));
gulp.task('test:client', ['test:client:single'], () => gulp.watch(TEST_PATH_WATCH, ['test:client:single']));

gulp.task('test:all:single', ['test:setup'], () => testWatch([].concat(TEST_PATH_SERVER, TEST_PATH_SHARED, TEST_PATH_CLIENT)));
gulp.task('test:all', ['test:all:single'], () => gulp.watch(TEST_PATH_WATCH, ['test:all:single']));