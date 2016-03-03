const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  notify = require('gulp-notify'),
  jasmine = require('gulp-jasmine'),
  watch = require('gulp-watch');

gulp.task('eslint', () => {
  gulp.src(['**/*.js', '!node_modules/**', '!graph-db/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  gulp.src('test/*.test.js')
    .pipe(jasmine({verbose: true}))
    .on('error', notify.onError({
      title: "Jasmine Test Failed.",
      message: "One of more tests failed."
     }));
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '!node_modules/**', '!graph-db/**'], ['default']);
});

gulp.task('default', () => {
  gulp.start('eslint', 'test');
});
