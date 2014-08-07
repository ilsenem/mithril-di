var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

gulp.task('minify', function () {
  gulp.src('mithril-di.js')
    .pipe(plugin.sourcemaps.init())
      .pipe(plugin.uglify())
    .pipe(plugin.sourcemaps.write())
    .pipe(plugin.rename('mithril-di.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['minify']);
