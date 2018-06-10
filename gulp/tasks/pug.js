'use strict';

module.exports = function () {
    const patterns = [];
    $.gulp.task('pug', function () {
        patterns.push({match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}`});//Math.ceil(Math.random()*100000)
        const fs = require('fs'),
            LOCALS = './source/template/data/content.json';
        return $.gulp.src('./source/template/pages/*.pug')
            .pipe($.gp.pug({
                locals: JSON.parse(fs.readFileSync(LOCALS, 'utf-8')),
                pretty: true
            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Pug',
                    message: error.message
                }
            }))
            .pipe($.gp.replaceTask({patterns, usePrefix: false}))
            .pipe($.gulp.dest($.config.root));
    });
};
