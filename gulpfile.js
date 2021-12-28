/* eslint-disable no-undef */
const { src, dest, watch, series, parallel } = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgsprite = require('gulp-svg-sprite');
const del = require('del');
const sync = require('browser-sync').create();

const styles = () => src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
    csso(),
  ]))
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(dest('build/css'))
  .pipe(sync.stream());

exports.styles = styles;

const html = () => src('source/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
  }))
  .pipe(dest('build'));

const scripts = () => src('source/js/*.js')
  .pipe(terser())
  .pipe(rename('script.min.js'))
  .pipe(dest('build/js'))
  .pipe(sync.stream());

exports.scripts = scripts;

const images = () => src('source/img/**/*.{png,jpg}')
  .pipe(imagemin([
    imagemin.mozjpeg({
      progressive: true,
    }),
    imagemin.optipng({
      optimizationLevel: 3,
    }),
    imagemin.svgo(),
  ]))
  .pipe(dest('build/img'));
exports.images = images;

const createWebp = () => src('source/img/*.{jpg,png}')
  .pipe(webp({
    quality: 90,
  }))
  .pipe(dest('build/img'));
exports.createWebp = createWebp;

const logo = () => src('source/img/logo/**/*.svg')
  .pipe(svgsprite({
    mode: {
      stack: {},
    },
  }))
  .pipe(rename('logo.svg'))
  .pipe(dest('build/img'));
exports.logo = logo;

const svgstack = () => src('source/img/icons/**/*.svg')
  .pipe(svgsprite({
    mode: {
      stack: {},
    },
  }))
  .pipe(rename('stack.svg'))
  .pipe(dest('build/img'));
exports.svgstack = svgstack;

const copy = (done) => {
  src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/favicon/favicon.svg',
    'source/*.webmanifest',
    'source/leaflet/*.{css,js}',
    'source/leaflet/images/*.png',
  ], {
    base: 'source',
  })
    .pipe(dest('build'));
  done();
};
exports.copy = copy;

const clean = () => del('build');

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

const reload = (done) => {
  sync.reload();
  done();
};

const watcher = () => {
  watch('source/sass/**/*.scss', series(styles));
  watch('source/js/*.js', series(scripts));
  watch('source/*.html', series(html, reload));
};

exports.default = series(
  clean,
  copy,
  parallel(
    styles,
    html,
    scripts,
    images,
    createWebp,
    logo,
    svgstack,
  ),
  series(
    server,
    watcher,
  ),
);
