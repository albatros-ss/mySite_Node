'use strict';

module.exports = function () {
  $.gulp.task('copy:favicon', function () {
    return $.gulp.src('./source/favicon/*.*')
      .pipe($.gulp.dest($.config.root + '/assets/favicon'));
  });
};