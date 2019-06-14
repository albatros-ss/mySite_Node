'use strict';

module.exports = function () {
  const patterns = [];
  $.gulp.task('html', function () {
    patterns.push({match: '%=suffix=%', replace: $.dev ? '' : '.min'});
    patterns.push({match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}`});//Math.ceil(Math.random()*100000)
    return $.gulp.src('./source/template/pages/*.html')
      .pipe($.gp.rigger())
      .on('error', $.gp.notify.onError(function (error) {
        return {
          title: 'Html',
          message: error.message
        };
      }))
      .pipe($.gp.replaceTask({patterns, usePrefix: false}))
      .pipe($.gulp.dest($.config.root));
  });
};