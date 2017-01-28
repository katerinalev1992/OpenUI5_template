var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');


var plugins = gulpLoadPlugins(
    {
      pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence', 'uglify']
      // TODO - run-sequence can be removed with gulp 4.0 => there will be standard solution for this
    }
);

var fs = require('fs');

var config = {
  bowerComponents: 'bower_components',
  webapp: "src/main/javascript",
  dist: "www",
  temp: "temp",
  ui5ResourceFolder: "resources"
};

gulp.task('ui5preload', function(){
  return gulp.src([
        config.temp + '/**/**.+(js|xml)',
        '!src/ui/thirdparty/**' //exclude files that don't belong in preload (optional)
      ])
      .pipe(plugins.if('**/*.js', plugins.uglify()))
      .pipe(plugins.if('**/*.xml',plugins.prettyData({type:'minify'})))
      .pipe(plugins.ui5Preload({base:config.temp, namespace:'com.openUI5_template'}))
      .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function() {
  return plugins.del([config.temp, config.webapp + '/' + config.ui5ResourceFolder, config.dist]);
});

gulp.task('copyToDist', function() {
  return gulp.src(config.temp + '/**').pipe(plugins.copy(config.dist, {prefix: 1}));
});

gulp.task('copyToTemp', function() {
  return gulp.src(config.webapp + '/**').pipe(plugins.copy(config.temp, {prefix: 3}));
});

gulp.task('copyResToDev', function() {
  return gulp.src(config.temp + '/**').pipe(plugins.copy(config.webapp, {prefix: 1}));
});

gulp.task('copyUI5res', function() {
  var ui5FilesToCopy = [
    config.bowerComponents + '/openui5-sap.m/resources/**',
    config.bowerComponents + '/openui5-sap.ui.core/resources/**',
    config.bowerComponents + '/openui5-sap.ui.layout/resources/**',
    config.bowerComponents + '/openui5-sap.ui.unified/resources/**',
    config.bowerComponents + '/openui5-themelib_sap_belize/resources/**'
  ];

  return gulp.src(ui5FilesToCopy).pipe(plugins.copy(config.temp + '/' + config.ui5ResourceFolder, {prefix: 3}));
});

gulp.task('default', function(cb) {
  plugins.runSequence('clean', 'copyUI5res', 'copyToTemp', 'ui5preload', 'copyToDist', cb);
});

gulp.task('dev', function(cb) {
  plugins.runSequence('clean','copyUI5res', 'copyResToDev', 'open', 'watch', cb);
});

gulp.task('devTest', function(cb) {
    plugins.runSequence('clean', 'copyUI5res', 'copyToTemp', 'copyToDist', cb);
});

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(config.webapp + '/**/*.js', ['']);

});

gulp.task('open', function() {
  gulp.src(config.webapp)
      .pipe(plugins.serverLivereload({
        defaultFile: 'index.html',
        livereload: true,
        directoryListing: false,
        open: true
      }));
});
