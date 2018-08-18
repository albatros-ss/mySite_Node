'use strict';

import circle from './about/circle';
import mapInit from './about/map';
import preloader from './common/preloader';
import parallaxScroll from './common/parallax-scroll';
import menu from './common/menu';
import scrollTo from './common/scroll-to';
import slider from './common/slider';
import indexPageFlip from './welcom/flip';
import blog from './blog/blog';
import mail from './works/mail';
import popup from './common/popup';
import auth from './welcom/auth';

(function ($) {
    let os = navigator.platform.indexOf('Linux');
    if (os === 0) {
        // noinspection JSJQueryEfficiency
        if ($('.balls').length) {
            $('.balls').css('transform', 'translateY(-4px)');
        }
    }

    window.onSubmitReCaptcha = function onSubmitReCaptcha(token) {
        grecaptcha.reset();
        mail.send();
    };

    //Common
    svg4everybody();
    preloader.init();

    function isCurrent(page) {
        return $(page).length;
    }

    //Page
    if (!(isCurrent('#page-welcome') || isCurrent('#page-admin'))) {
        parallaxScroll.init();
        menu.init();
        scrollTo.init('.js-scrollto', 500);
    }
    // Welcome
    if (isCurrent('#page-welcome')) {
        indexPageFlip.init();
        auth.init();
        popup.init();
    }
    // Works
    if (isCurrent('#page-works')) {
        slider.init();
        mail.init();
        popup.init();
        if (os === 0) {
            // noinspection JSJQueryEfficiency
            if ($('.icon-balls').length) {
                $('.icon-balls').css('transform', 'translateY(-4px)');
            }
        }
    }
    // About
    if (isCurrent('#page-about')) {
        circle.init();
        mapInit.init();
    }
    // blog
    if (isCurrent('#page-blog')) {
        blog.init();
    }
})(jQuery);