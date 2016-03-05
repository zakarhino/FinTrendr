const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  notify = require('gulp-notify'),
  mocha = require('gulp-mocha'),
  watch = require('gulp-watch'),
  env = require('gulp-env');

gulp.task('lint', () => {
  gulp.src(['**/*.js', '**/*.test.js', '!node_modules/**', '!graph-db/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  env({
    vars: {
      NODE_ENV: "testing",
    }
  });
  gulp.src('test/*.test.js')
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', () => {
      process.exit(1);
      notify.onError({
        title: "Mocha Test Failed.",
        message: "One of more tests failed."
      })
    })
    .once('end', () => {
      process.exit();
    });;
});

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '**/*.test.js', '!node_modules/**', '!graph-db/**'], ['default']);
});

gulp.task('default', () => {
  gulp.start('lint', 'test');
});
