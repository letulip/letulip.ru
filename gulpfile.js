const del = require('del');
const { series, src, dest, start, watch } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const mqpacker = require('css-mqpacker');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const sprite = require('gulp-svgstore');
const server = require('browser-sync').create();

const style = () => {
  return src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      mqpacker({sort: true})
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(filter('**/*.css', {restore: true}))
    .pipe(csso({
      restructure: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
};

const scripts = () => {
  return src([
    'src/js/*.js',
    'src/blocks/**/*.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init()).pipe(rollup({}, {
      format:'iife'
    }))
    .pipe(sourcemaps.write(''))
    .pipe(dest('dist/js'));
};

const copy = () => {
  return src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/*.*',
    'src/animations/*.*'
  ], {
    base: 'src'
  })
    .pipe(dest('dist'));
};

const copyHtml = () => {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(server.stream());
};

const copyImages = () => {
  return src('src/img/**/*.{jpg,jpeg,png,svg}')
    .pipe(dest('dist/img/'))
    .pipe(server.stream());
};

const clean = () => {
  return del('dist');
};

const createSprite = () => {
  return src([
    'src/img/icons/icon-*.svg',
    'src/img/contentSvg/logo_*.svg'
  ])
    .pipe(sprite())
    .pipe(rename('sprite.svg'))
    .pipe(dest('dist/img'));
};

const copyFonts = () =>{
  return src([
    'fonts/**/*.{woff,woff2}',
  ], {
    base: 'src'
  })
    .pipe(dest('dist'));
};

const jsWatch = () => {
  server.reload();
  // done();
};

const build = () => {
  start('copy');
};

const serve = () => {
  server.init({
    server: './dist',
    notify: false,
    open: true,
    port: 13531,
    ui: false
  });

  watch(['src/scss/**/*.scss', 'src/scss/style.scss', 'src/blocks/**/*.scss'], style).on('change', server.reload);
  watch('src/*.html', copyHtml);
  watch(['src/js/**/*.js', 'src/blocks/**/*.js'], jsWatch).on('change', server.reload);

  watch('*.html').on('change', server.reload);
};

exports.build = series(
  clean,
  copyHtml,
  scripts,
  style,
  createSprite,
  copyFonts,
  copyImages,
  copy,
);

exports.serve = serve, series(build);
