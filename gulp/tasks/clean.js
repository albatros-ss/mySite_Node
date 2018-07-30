'use strict';

module.exports = function () {
    $.gulp.task('clean', function (cb) {
        return $.del([$.config.root + '/assets/**', $.config.root + '/**.*'], cb);
    });
};
