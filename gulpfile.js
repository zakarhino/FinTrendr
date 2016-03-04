const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  notify = require('gulp-notify'),
  mocha = require('gulp-mocha'),
  watch = require('gulp-watch');

<<<<<<< HEAD
gulp.task('lint', () => {
=======
gulp.task('eslint', () => {
>>>>>>> 5c5ae7e2876f24c847ad47d71a61ab28ab1ebb03
  gulp.src(['**/*.js', '**/*.test.js', '!node_modules/**', '!graph-db/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  gulp.src('test/*.test.js')
    .pipe(mocha({reporter: 'list'}))
    .on('error', notify.onError({
      title: "Mocha Test Failed.",
      message: "One of more tests failed."
     }));
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '**/*.test.js', '!node_modules/**', '!graph-db/**'], ['default']);
});

gulp.task('default', () => {
  gulp.start('lint', 'test');
});
