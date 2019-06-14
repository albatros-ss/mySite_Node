'use strict';

module.exports = function () {
  $.gulp.task('sprite:png', function () {
    let spriteData = $.gulp.src('./source/sprite/*.{png,jpg}').pipe($.gp.spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      algorithm: 'left-right',
      imgPath: '../img/sprite.png',
      padding: 20
    }));
    let imgStream = spriteData.img
      .pipe($.gulp.dest('./source/images'));

    let cssStream = spriteData.css
      .pipe($.gulp.dest('./source/style/_misc'));

    return $.merge(imgStream, cssStream);
  });
};