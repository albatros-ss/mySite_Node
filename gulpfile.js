"use strict";
// for windows set NODE_ENV=development&& gulp
// set NODE_ENV=production&& gulp build
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

global.$ = {
    dev: isDevelopment,
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsFoundation: require('./gulp/paths/js.foundation.js'),
        cssFoundation: require('./gulp/paths/css.foundation.js'),
        app: require('./gulp/paths/app.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    browserSync: require('browser-sync').create(),
    cssunit: require('gulp-css-unit'),
    spritesmith: require('gulp.spritesmith'),
    webpack: require('webpack-stream'),
    UglifyJSPlugin: require('uglifyjs-webpack-plugin'),
    webpackConfig: require('./webpack.config.js'),
    babel: require("gulp-babel"),
    nodemon: require('nodemon'),
    imagemin : require("gulp-imagemin"),
    imageminJpegRecompress : require('imagemin-jpeg-recompress'),
    imageminPngquant : require('imagemin-pngquant'),
    gp: require('gulp-load-plugins')({
        rename: {
            'gulp-replace-task': 'replaceTask'
        }
    })
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});
$.gulp.task('default', $.gulp.series(
    'clean',
    'sprite:svg',
    $.gulp.parallel(
        'css:foundation',
        'sass',
        'js:foundation',
        'js:process',
        'copy:image',
        'copy:root',
        'copy:fonts',
        'copy:favicon'
        ),
    'nodemon',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    'sprite:svg',
    $.gulp.parallel(
        'css:foundation',
        'sass',
        'js:foundation',
        'js:process',
        'copy:image',
        'copy:root',
        'copy:fonts',
        'copy:favicon'
        ),
    'nodemon',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));

