// /*jshint strict:false */
/* global require*/
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var path = require('path');
var data = require('gulp-data');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var $ = require('gulp-load-plugins')();
var imagemin = require('gulp-imagemin');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');

var settings = {
    publicDir: 'dist',
    sassDir: '/src/assets/scss',
    layoutDir: 'src',
    partialsDir: 'src/templates',
    cssDir: '/dist/assets/css',

    systemNotify: true
};

// ### Serve task

gulp.task('serve', ['sass','images', 'scss-vendor', 'scripts-vendor', 'scripts', 'templates'], function () {

    browserSync.init({
        server: settings.publicDir
    });

    gulp.watch("./src/assets/scss/**/**/*.scss", ['sass']);

    gulp.watch([settings.layoutDir + "/**/*.jade"], ['templates']);
    gulp.watch([settings.layoutDir + "/assets/images/**/*"], ['images']);
    gulp.watch([settings.layoutDir + "/assets/vendor/*"], ['scripts-vendor']);
    gulp.watch([settings.layoutDir + "/assets/vendor/**/*"], ['scss-vendor']);
    gulp.watch([settings.layoutDir + "/assets/js/*"], ['scripts']);

});

// ### Sass task

gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/**/*.scss')
        .pipe(plumber({
            errorHandler: settings.systemNotify ? notify.onError("Error: <%= error.messageOriginal %>") : function (err) {
                console.log(" ************** \n " + err.messageOriginal + "\n ************** ");
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))

        .pipe(csscomb())
        .pipe(csso())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});


gulp.task('scss-vendor', function() {
    return gulp.src('./src/assets/vendor/**/**/*.scss')
        .pipe(plumber({
            errorHandler: settings.systemNotify ? notify.onError("Error: <%= error.messageOriginal %>") : function (err) {
                console.log(" ************** \n " + err.messageOriginal + "\n ************** ");
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/assets/vendor'))
        .pipe(browserSync.stream());
});

// ###  Jade task

gulp.task('templates', function () {
    gulp.src('./src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', notify.onError(function (error) {
            return 'An error occurred while compiling jade.\nLook in the console for details.\n' + error;
        }))
        .pipe(gulp.dest(settings.publicDir))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('./src/assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.stream());
});
gulp.task('scripts-vendor', function() {
    return gulp.src('./src/assets/vendor/**/**/*.js')
        .pipe(gulp.dest('./dist/assets/vendor'))
        .pipe(browserSync.stream());
});

// ### Images task

gulp.task('images', function () {
    return gulp.src('./src/assets/images/**/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(gulp.dest('./dist/assets/images'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);