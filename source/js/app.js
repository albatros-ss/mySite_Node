'use strict';

import heightWindow from './common/height-window';
import circle from './about/circle';
import mapInit from './about/map';
import preloader from './common/preloader';
import parallaxScroll from './common/parallax-scroll';
import menu from './common/menu';
import scrollTo from './common/scroll-to';
import slider from './common/slider';
import parallax from './welcom/parallax-mouse';
import video from './welcom/video-size';
import indexPageFlip from './welcom/flip';
import blog from './blog/blog';
import mail from './works/mail';

(function ($) {

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
        parallax.init();
        video.init();
        video.move();
        indexPageFlip.init();
    }
    // Works
    if (isCurrent('#page-works')) {
        slider.init();
        mail.init();
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

$(window).on('load', function () {
    heightWindow.init();
});