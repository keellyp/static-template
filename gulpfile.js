// Get dependencies 
const gulp    = require('gulp'),
  browserSync = require('browser-sync').create(),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  buffer      = require('vinyl-buffer'),
  source      = require('vinyl-source-stream'),
  env         = require('babel-preset-env')

// Get all gulp dependencies 
const plugin = require('gulp-load-plugins')();

// Variables
const config = {
  assets: 'assets/',
  dist: 'dist/',
  isProd: process.env.NODE_ENV === 'production'
}

// BrowserSync http://localhost:3000/ 
gulp.task('browserSync', () => {
  browserSync.init({
    server: config.dist
  })
})

// Clean dist 
gulp.task('clean', () => {
  return gulp.src(`${config.dist}**/*`, { read: false })
    .pipe(plugin.rm())
})

// CSS function : Handle Sass, autoprefix, minify, sourcemaps
gulp.task('style', () => {
  gulp
    .src(`${config.assets}/scss/*.scss`)
    .pipe(plugin.plumber({
      errorHandler: plugin.notify.onError('SASS Error <%= error.message %>')
    }))
    .pipe(!config.isProd ? plugin.sourcemaps.init() : plugin.util.noop())
    .pipe(plugin.sass({
      outputStyle: 'compressed'
    })
    .on('error', plugin.sass.logError))
    .pipe(plugin.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugin.csscomb())
    .pipe(config.isProd ? plugin.cssnano() : plugin.util.noop())
    .pipe(!config.isProd ? plugin.sourcemaps.write() : plugin.util.noop())
    .pipe(plugin.rename('style.min.css'))
    .pipe(gulp.dest(`${config.dist}css`))
    .pipe(browserSync.stream())
    plugin.util.log(plugin.util.colors.green('Style is done'))
})

// JS function : Browserify, Minify, Sourcemaps
gulp.task('javascript', () => {
  let bundler = browserify({
    entries: `${config.assets}/javascript/app.js`,
    debug: true
  }).transform(babelify, {presets: [env]});
  
  return bundler.bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(plugin.plumber({errorHandler: plugin.notify.onError("Error: <%= error.message %>")}))
  .pipe(plugin.sourcemaps.init({loadMaps: true}))
  .pipe(config.isProd ? plugin.streamify(plugin.uglify()) : plugin.util.noop())
  .pipe(plugin.rename('app.min.js'))
  .pipe(gulp.dest(`${config.dist}js`))
  .pipe(browserSync.stream())
  plugin.util.log(plugin.util.colors.green('JS is done'))    
})

// Create different size for images 
gulp.task('srcset', () => {
  return gulp.src(`${config.assets}images/src/*.{png, jpg}`)
    .pipe(plugin.responsive({
      '*': [
        { width: 350, rename: { suffix: '@350w' }, },
        { width: 560, rename: { suffix: '@560w' }, },
        { width: 720, rename: { suffix: '@720w' }, },
        { width: 1280, rename: { suffix: '@1280w' }, },
        { width: 1920, rename: { suffix: '@1920w' }, },
        { rename: { suffix: '-full' }, }], 
      }, {
      quality: 70,
      progressive: true,
      withMetadata: false,
      }))
    .pipe(gulp.dest(`${config.assets}images`));
});

// Image optimisation
gulp.task('images', () => {
  gulp
    .src(`${config.assets}images/*.{png, jpg, svg, gif}`)
    .pipe(config.isProd ? plugin.imagemin([
      plugin.imagemin.gifsicle({interlaced: true}),
      plugin.imagemin.jpegtran({progressive: true}),
      plugin.imagemin.optipng({optimizationLevel: 5}),
      plugin.imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {
      verbose: true
    }) : plugin.util.noop())
    .pipe(gulp.dest(`${config.dist}img`))
    .pipe(browserSync.stream())
    plugin.util.log(plugin.util.colors.green('Images is done'))    
})

// Replace font into dist folder
gulp.task('fonts', () => {
  gulp
    .src(`${config.assets}fonts/*`)
    .pipe(gulp.dest(`${config.dist}fonts`))
    .pipe(browserSync.stream())
    plugin.util.log(plugin.util.colors.green('Fonts has been move'))
})

// Include HTML files into dist folder under the name of index.html 
gulp.task('fileinclude', function () {
  gulp
    .src(`${config.assets}/index.html`)
    .pipe(plugin.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(`${config.dist}`))
    .pipe(browserSync.stream())
    plugin.util.log(plugin.util.colors.green('File has been included'))    
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
gulp.task('build', ['fileinclude', 'style', 'javascript', 'fonts', 'images'], () => {})
