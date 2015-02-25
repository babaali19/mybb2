var gulp = require("gulp"),
    gutil = require("gulp-util"),
    changed = require("gulp-changed"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    stripDebug = require("gulp-strip-debug"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    del = require('del'),
    browserify = require("browserify");

var paths = {
    bower: "./bower_components",
    dist: "./assets",
    js: {
        src: "./js",
        dest: "./assets/js"
    },
    css: {
        src: "./css",
        dest: "./assets/css"
    },
    images: {
        src: "./images",
        dest: "./assets/images"
    },
    fonts: {
        src: "./fonts",
        dest: "./assets/fonts"
    }
};

gulp.task("default", ["images", "scripts", "styles", "fonts"]);

gulp.task("clean", function(cb) {
    del(
        [
            paths.js.dest + "/**",
            paths.css.dest + "/**",
            paths.images.dest + "/**",
            paths.fonts.dest + "/**"
        ]
        , cb);
});

gulp.task("watch", ["default"], function() {
    gulp.watch(paths.js.src + "/**/*.js", ["scripts"]);
    gulp.watch(paths.images.src + "/**/*", ["images"]);
    gulp.watch(paths.css.src + "/**/*.scss", ["styles"]);
    gulp.watch(paths.fonts.src + "/**/*", ["fonts"]);
});

gulp.task("images", function() {
    return gulp.src(paths.images.src + "/*")
        .pipe(changed(paths.images.dest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task("scripts", function() {
    // Compile scripts, will use browserify...
});

gulp.task("styles", function() {
    return gulp.src([paths.bower + "/normalize-css/normalize.css", paths.bower + "/fontawesome/scss/font-awesome.scss", paths.css.src + "/main.scss"])
        .pipe(sass({
            includePaths: [
                "./app/bower_components"
            ]
        }))
        .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(concat("main.css"))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(rename({suffix: ".min"}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task("fonts", function() {
    return gulp.src(paths.bower + "/fontawesome/fonts/**.*").pipe(gulp.dest(paths.fonts.dest));
});
