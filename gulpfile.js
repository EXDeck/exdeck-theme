const gulp = require("gulp")
const gulpDartSass = require("gulp-dart-sass")
const sassGlob = require("gulp-sass-glob-use-forward")
const rename = require("gulp-rename")
const cleanCSS = require("gulp-clean-css")
const header = require("gulp-header")

require("dotenv").config()

const cp = !(process.env.COPY === "false")
console.log(cp)

const themeName = "harmony"

function getLicenseText() {
  delete require.cache[`${__dirname}/package.json`]
  const pack = require(`${__dirname}/package.json`)
  return [
    `${pack.name} v${pack.version}`,
    `${pack.license} License`,
    "https://github.com/EXDeck/exdeck-theme",
  ]
}

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
    .pipe(header(`/*! ${getLicenseText().join(" | ")} */`))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/"))
}
exports.build = build

const series = ["build"]
cp && series.push("copy")

const copy = () => {
  if (cp) {
    return gulp.src("dist/*.css").pipe(gulp.dest(process.env.DIR))
  }
}
exports.copy = copy

const watch = () => {
  return gulp.watch("src/**/*.scss", gulp.series(series))
}
exports.watch = watch
