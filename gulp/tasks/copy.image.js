'use strict';

module.exports = function() {
    $.gulp.task('copy:image', function() {
        return $.gulp.src('./source/images/**/*.*', {since: $.gulp.lastRun('copy:image') })
            .pipe($.imagemin([
                $.imagemin.gifsicle({interlaced: true}),
                $.imageminJpegRecompress($.config.imageminJpegRecompressConfig),
                $.imageminPngquant($.config.imageminPngquantConfig),
                $.imagemin.svgo({plugins: [{removeViewBox: false}]})
            ]))
            .pipe($.gulp.dest($.config.root + '/assets/img'));
    });
};
