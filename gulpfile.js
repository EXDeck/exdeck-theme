const gulp = require("gulp")
const gulpDartSass = require("gulp-dart-sass")
const sassGlob = require("gulp-sass-glob-use-forward")
const rename = require("gulp-rename")
const cleanCSS = require("gulp-clean-css")
const header = require("gulp-header")

const themeName = "harmony"

const pack = require("./package.json")

const licenseTexts = [
  `${pack.name} v${pack.version}`,
  `${pack.license} License`,
  "https://github.com/MarinDeck/birdseye-theme-harmony",
]

const build = () => {
  return gulp
    .src("src/**/*.scss")
    .pipe(sassGlob())
    .pipe(gulpDartSass({ includePaths: ["src"], outputStyle: "compressed" }))
    .pipe(
      rename({
        basename: themeName + ".min",
      })
    )
    .pipe(header(`/*! ${licenseTexts.join(" | ")} */`))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/"))
}
exports.build = build

const watch = () => {
  return gulp.watch("src/**/*.scss", gulp.series(["build"]))
}
exports.watch = watch
