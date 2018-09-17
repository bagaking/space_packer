const gulp = require('gulp');
//docs of jsdoc : http://www.css88.com/doc/jsdoc/about-configuring-jsdoc.html
const jsdoc = require('gulp-jsdoc3');
const mocha = require('gulp-mocha');
//const babel = require('gulp-babel');

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.js'], {
        read: false
    })
        .pipe(jsdoc(cb));
});

gulp.task('test', function () {
    return gulp.src(['./test/**/*.js'])
    //.pipe(babel())
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('default', function () {
    return gulp.src(['./src/**/*.js'])
    //.pipe(babel())
        .pipe(gulp.dest("dist"))
})

gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['doc'])
    gulp.watch(['./src/**/*.js', './lib/**/*.js', './test/**/*.js'], ['test'])
})
