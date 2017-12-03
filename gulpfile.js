// Variables
const config = {
  assets: 'assets/',
  dist: 'dist/',
  isProd: process.env.NODE_ENV === 'production'
}

const gulp          = require('gulp'),
  // Tools dependencies
  gulp_util         = require('gulp-util'),
  del               = require('del'),
  gulp_rename       = require('gulp-rename'),
  gulp_plumber      = require('gulp-plumber'),
  gulp_notify       = require('gulp-notify'),
  gulp_sourcemaps   = require('gulp-sourcemaps'),
  browserSync       = require('browser-sync').create(),
  gulp_fileinclude  = require('gulp-file-include'),
  // Image depedency
  gulp_imagemin     = require('gulp-imagemin'),
  // Style dependencies
  gulp_sass         = require('gulp-sass'),
  gulp_autoprefixer = require('gulp-autoprefixer'),
  gulp_cssnano      = require('gulp-cssnano'),
  gulp_concatcss    = require('gulp-concat-css'),
  // Javascript dependencies
  browserify        = require('browserify'),
  babelify          = require('babelify'),
  buffer            = require('vinyl-buffer'),
  source            = require('vinyl-source-stream'),
  env            = require('babel-preset-env'),
  gulp_uglify       = require('gulp-uglify')
  gulp_streamify       = require('gulp-streamify')

// BrowserSync http://localhost:3000/ : static server + watching HTML, SCSS, JS files
gulp.task('browserSync', () => {
  browserSync.init({
    server: config.dist
  })
})

// Clean dist 
gulp.task('clean', () => {
  del([config.dist], {
    force: true,
    dryRun: true
  })
})

// CSS function
gulp.task('style', () => {
  gulp
    .src(`${config.assets}/scss/*.scss`)
    .pipe(gulp_plumber({
      errorHandler: gulp_notify.onError('SASS Error <%= error.message %>')
    }))
    .pipe(!config.isProd ? gulp_sourcemaps.init() : gulp_util.noop())
    .pipe(gulp_sass({
      outputStyle: 'compressed'
    })
    .on('error', gulp_sass.logError))
    .pipe(gulp_autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(config.isProd ? gulp_cssnano() : gulp_util.noop())
    .pipe(!config.isProd ? gulp_sourcemaps.write() : gulp_util.noop())
    .pipe(gulp_rename('style.min.css'))
    .pipe(gulp.dest(`${config.dist}css`))
    .pipe(browserSync.stream())
    gulp_util.log(gulp_util.colors.green('Style is done'))
})

// JS function
gulp.task('javascript', () => {
  browserify(`${config.assets}/javascript/app.js`, {
    debug: true
  })
  .transform('babelify', {presets: [env]})
  .bundle()
  .on('error', gulp_notify.onError('<%= error.message %>'))
  .pipe(source('app.js'))
  .pipe(config.isProd ? gulp_streamify(gulp_uglify()) : gulp_util.noop())
  .pipe(gulp_rename('script.min.js'))
  .pipe(gulp.dest(`${config.dist}js`))
  .pipe(browserSync.stream())
  gulp_util.log(gulp_util.colors.green('JS is done'))    
})

// Minifies images
gulp.task('images', () => {
  gulp
    .src(`${config.assets}images/*`)
    .pipe(config.isProd ? gulp_imagemin() : gulp_util.noop())
    .pipe(gulp.dest(`${config.dist}img`))
    .pipe(browserSync.stream())
    gulp_util.log(gulp_util.colors.green('Images is done'))    
})

// Replace font into dist folder
gulp.task('fonts', () => {
  gulp
    .src(`${config.assets}fonts/*`)
    .pipe(gulp.dest(`${config.dist}fonts`))
    .pipe(browserSync.stream())
    gulp_util.log(gulp_util.colors.green('Fonts has been move'))
})

// Include HTML files into dist folder under the name of index.html 
gulp.task('fileinclude', function () {
  gulp
    .src(`${config.assets}/index.html`)
    .pipe(gulp_fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(`${config.dist}`))
    .pipe(browserSync.stream())
    gulp_util.log(gulp_util.colors.green('File has been included'))    
})

// Watch all my task
gulp.task('watch', ['fileinclude', 'style', 'javascript', 'fonts', 'images'], () => {
  gulp.watch(`${config.assets}**/*.html`, ['fileinclude'])
  gulp.watch(`${config.assets}scss/**/*.scss`, ['style'])
  gulp.watch(`${config.assets}javascript/**/*.js`, ['javascript'])
  gulp.watch(`${config.assets}images/**/*`, ['images'])
  gulp.watch(`${config.assets}fonts/*`, ['fonts'])
})

// Default task
gulp.task('default', ['browserSync', 'watch'], () => {})

// Build task
gulp.task('build', ['clean', 'fileinclude', 'style', 'javascript', 'fonts', 'images'], () => {})
