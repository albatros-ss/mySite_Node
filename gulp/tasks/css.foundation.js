'use strict';

module.exports = function () {
    $.gulp.task('css:foundation', function (cb) {
        if ($.path.jsFoundation.length === 0) {
            fs.mkdirSync($.config.root);
            fs.mkdirSync(path.join($.config.root, 'assets'));
            fs.mkdirSync(path.join($.config.root, 'assets/js'));

            let file = path.join($.config.root, 'assets/js');
            file = !$.dev
                ? path.join(file, 'foundation.min.js')
                : path.join(file, 'foundation.min.js');

            fs.writeFile(file, 'console.log("Hello Node.js")', err => {
                if (err) throw err;
                cb();
            });
        } else {
            return $.gulp.src($.path.cssFoundation)
                .pipe($.gp.concatCss('foundation.min.css'))
                .pipe($.gp.csso())
                .pipe($.gulp.dest($.config.root + '/assets/css'))
        }
    })
};
