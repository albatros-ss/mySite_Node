'use strict';

module.exports = function () {
    $.gulp.task('optim:image', function () {
        return $.gulp.src(['./source/images/**/*.*',
            '!./source/images/sprite.svg', 
            '!./source/images/sprite.png'])
            .pipe($.imagemin([
                $.imagemin.gifsicle({interlaced: true}),
                $.imageminJpegRecompress(),
                $.imageminPngquant(),
                $.imagemin.svgo({plugins: [{removeViewBox: false}]})
            ]))
            .pipe($.gulp.dest('./source/images'));
    });
};
