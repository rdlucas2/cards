var browserify = require('browserify');
var gulp = require('gulp');
var minify = require('gulp-minify');
var minifyCSS = require('gulp-csso');
var pump = require('pump');
var source = require('vinyl-source-stream');
var ts = require("gulp-typescript");
var tsify = require('tsify');
var tsProject = ts.createProject('tsconfig.json');
var uglify = require('gulp-uglify');

gulp.task('html-dev', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dev'))
});

gulp.task('css-dev', function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dev/css'))
});

gulp.task('browserify-dev', function() {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dev"));
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('browserify', function() {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task('browserify', function() {
    return browserify({
            basedir: '.',
            debug: true,
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task('uglify', function(cb) {
    pump([
            gulp.src('dist/bundle.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('default', gulp.series('html-dev', 'css-dev', 'browserify-dev'));

gulp.task('watch', gulp.series(function() { gulp.watch(['src/*.ts', 'src/cards/*.ts', 'src/cards/**/*.ts', 'src/css/*.css'], gulp.parallel('default')) }));

gulp.task('build', gulp.series('html', 'css', 'browserify', 'uglify'));