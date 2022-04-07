const gulp = require("gulp")
const gulpDartSass = require("gulp-dart-sass")
const sassGlob = require("gulp-sass-glob-use-forward")

const sass = () => {
  return gulp
    .src("src/**/*.scss")
    .pipe(sassGlob())
    .pipe(gulpDartSass({ includePaths: ["src"], outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/"))
}
exports.sass = sass
