'use strict';

module.exports = function () {
    $.gulp.task('html', function () {
        return $.gulp.src('./source/template/pages/*.html')
            .pipe($.gp.rigger())
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Html',
                    message: error.message
                }
            }))
            .pipe($.gulp.dest($.config.root));
    });
};
