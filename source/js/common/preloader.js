'use strict';

const preloader = (function () {

    let percentsTotal = 0,
        preloader = $('#preloader'),
        spinnerPercent = $('#preloader__spinner-percent');

    let imgPath = $('*').map(function () {
        let $this = $(this),
            background = $this.css('background-image'),
            img = $this.is('img'),
            path = '';

        if (background !== 'none') {
            path = background.replace('url("', '').replace('")', '');
        }

        if (img) {
            path = $this.attr('src');
        }

        if (path) return path;
    });

    function setPercents(total, current) {
        let percent = Math.ceil(current / total * 100);

        spinnerPercent.text(percent + '%');

        if (percent >= 100) {
            preloader.fadeOut();
            if ($('#welcom-card').length) {
                $('#welcom-card').addClass('welcom-card_active');
            }
        }
    }

    function loadImg(images) {

        if (!images.length) preloader.fadeOut();

        images.map(function (img) {
            $('<img>', {
                attr: {
                    src: img
                }
            }).on('load error', function () {
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });
    }

    return {
        init: function () {
            let imgs = imgPath.toArray();
            loadImg(imgs);
        }
    };
})();
export default preloader;