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
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('html-dev', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dev'))
});

gulp.task('css-dev-concat', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dev/css'))
});

gulp.task('css-dev', function() {
    return gulp.src('dev/css/styles.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dev/css'))
});

// gulp.task('comment-out-firebase', function() {
//     return gulp.src(['src'])
//         .pipe(replace("import * as firebase from 'firebase';", "//import * as firebase from 'firebase';"))
//         .pipe(gulp.dest('src/main.ts'))
// });

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

gulp.task('css-concat', function() {
    return gulp.src(['src/css/normalize.css', 'src/css/bart.css', 'src/css/homer.css', 'src/css/marge.css', 'src/css/styles.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('css', function() {
    return gulp.src('dist/css/styles.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('browserify', function() {
    return browserify({
            basedir: '.',
            debug: false,
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

gulp.task('default', gulp.series('html-dev', 'css-dev-concat', 'css-dev', 'browserify-dev'));

gulp.task('watch', gulp.series(function() {
    gulp.watch(['src/*.ts', 'src/cards/*.ts', 'src/cards/**/*.ts', 'src/css/*.css'], gulp.parallel('default'))
}));

gulp.task('build', gulp.series('html', 'css-concat', 'css', 'browserify', 'uglify'));