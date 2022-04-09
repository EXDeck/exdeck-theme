const gulp = require("gulp")
const gulpDartSass = require("gulp-dart-sass")
const sassGlob = require("gulp-sass-glob-use-forward")
const rename = require("gulp-rename")
const cleanCSS = require("gulp-clean-css")
const header = require("gulp-header")

require("dotenv").config()

const cp = !!process.env.COPY

const themeName = "harmony"

const build = () => {
  const pack = require("./package.json")
  const licenseTexts = [
    `${pack.name} v${pack.version}`,
    `${pack.license} License`,
    "https://github.com/MarinDeck/birdseye-theme-harmony",
  ]

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

const series = ["build"]
cp && series.push("copy")

const copy = () => {
  return gulp.src("dist/*.css").pipe(gulp.dest(process.env.DIR))
}
exports.copy = copy

const watch = () => {
  return gulp.watch("src/**/*.scss", gulp.series(series))
}
exports.watch = watch
