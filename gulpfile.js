var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  sassSrc: 'scss/**/*.scss',
  cssDist: 'css-compiled',
};

gulp.task('sass', function() {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(
      sass().on('error', sass.logError)
    )
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('watch', function() {
  return gulp.watch(paths.sassSrc, gulp.series(['sass']));
});

gulp.task('default', gulp.series('watch'));
