const gulp   = require('gulp');
const concat = require('gulp-concat');
const sass   = require('gulp-sass');
const child  = require('child_process');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const gutil  = require('gulp-util');

const cssFiles = '_site/assets/css/**/*.css';

gulp.task('css', function() {
    gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('_site/assets/css'))
});

gulp.task('jekyll', function() {
    const jekyll = child.spawn('jekyll', ['build',
        '--watch',
        '--incremental',
        '--drafts'
    ]);

    const jekyllLogger = function(buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach(function(message) { gutil.log('Jekyll: ' + message) });
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});


const browserSync = require('browser-sync').create();

const siteRoot = '_site';

gulp.task('serve', function() {
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: siteRoot
        }
    });

    gulp.watch(cssFiles, ['css']);
});


gulp.task('default', ['jekyll', 'serve']);