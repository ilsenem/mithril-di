var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

gulp.task('clean', function () {
  gulp.src(['mithril-di.js', 'mithril-di.min.js'], {read: false})
    .pipe(plugin.rimraf());
});

gulp.task('minify', function () {
  gulp.src('mithril-di.js')
    .pipe(plugin.uglify())
    .pipe(plugin.rename('mithril-di.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function () {
  gulp.src('src/mithril-di.coffee')
    .pipe(plugin.coffee({bare: true}))
    .pipe(gulp.dest('./'));
});
