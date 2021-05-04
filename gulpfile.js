const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');


// File paths
const files = {
    scssPath: 'src/scss/**/*.scss',
    cssPath: 'src/css/**/*.css',
    jsPath: 'src/js/**/*.js',
    htmlPath: 'src/html/**/*.html'
};

function jsTask() {
    return src([
        './src/js/nouislider.min.js', './src/js/splide.min.js', './src/js/scripts.js'

        ])
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function browserifyTask() {
    return browserify('dist/js/script.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(dest('dist/js/bundle'))
        .pipe(browserSync.stream());
};


function scssTask() {
    return src([
            files.cssPath, files.scssPath
        ])
        .pipe(sourcemaps.init())
        .pipe(sass().pipe(sass().on('error', sass.logError)))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'));
}



function includeHTML() {
    return src([
            files.htmlPath,
            '!src/html/partials/**'
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}


function watchTask() {
    browserSync.init({
        server: "./dist",
        port: 4000,
    });
    watch([files.scssPath, files.jsPath, files.htmlPath], {
            interval: 1000,
            usePolling: true
        }, 
        series(parallel(includeHTML, scssTask, jsTask), browserifyTask));
}


exports.default = series(includeHTML, scssTask, jsTask, browserifyTask, watchTask);