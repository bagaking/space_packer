const gulp = require('gulp');
//docs of jsdoc : http://www.css88.com/doc/jsdoc/about-configuring-jsdoc.html
const jsdoc = require('gulp-jsdoc3');
var mocha = require('gulp-mocha');

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('test', function() {
  return gulp.src(['./src/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['test']);
  gulp.watch('./src/**/*.js', ['doc']);
});

gulp.task('default', ['watch']);