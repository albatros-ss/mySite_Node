'use strict';

module.exports = function () {
    $.gulp.task('js:process_build', function () {
        $.webpackConfig.devtool ='source-map';
        return $.gulp.src($.path.app)
            .pipe($.webpack($.webpackConfig))
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};
