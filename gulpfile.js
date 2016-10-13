/* eslint-disable */
var gulp = require("gulp");
var gutil = require("gulp-util");
var eslint = require('gulp-eslint');
var webpack = require("webpack");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack/webpack.config.js');

gulp.task('lint', function() {
  return gulp.src(
    [
      '**/*.js',
      '!node_modules/**/*',
      '!build/**/*',
      '!dist/**/*',
      '!assets/**/*'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', function() {
  var app = new (require('express'))();
  var port = 3000;

  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
  
  app.listen(port, function (error) {
    if (error) {
      gutil.PluginError(error);
    } else {
      gutil.log("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
  });
});