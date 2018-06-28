'use strict';

module.exports = function () {
    $.gulp.task('js:process', function () {
        return $.gulp.src($.path.app)
            .pipe($.webpack($.webpackConfig))
            .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
};
