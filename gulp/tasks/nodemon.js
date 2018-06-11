'use strict';

module.exports = function () {

    $.gulp.task('nodemon', function (cb) {
        var called = false;
        return $.gp.nodemon({
            // nodemon our expressjs server
            script: 'app.js',
            // watch core server file(s) that require server restart on change
            watch: ['*'],
            ext: 'js css html pug json',
            ignore: ['./gulp', './node_modules', $.config.root] // './source'
        }).on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        })
            .on('restart', function onRestart() {
                // reload connected browsers after a slight delay
                setTimeout(function reload() {
                    $.browserSync.reload({stream: false});
                }, $.config.BROWSER_SYNC_RELOAD_DELAY);
            });
    });
};