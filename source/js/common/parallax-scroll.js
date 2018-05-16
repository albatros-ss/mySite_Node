'use strict';

const parallaxScroll = (function () {
    function startParallax() {
        const bg = document.getElementById('header__bg'),
            user = document.getElementById('author-card'),
            stars = document.getElementById('header__middle-star1'),
            wScroll = window.pageYOffset,
            starsX = true;

        function strafeParallax(block, windowScroll, strafeAmount, starsX) {
            let strafe = windowScroll / -strafeAmount + '%';
            let transformString;
            if (starsX) {
                transformString = `translate3d(-50%, ${strafe}, 0)`;
            } else {
                transformString = `translate3d(0, ${strafe}, 0)`;
            }

            block.style.transform = transformString;
        }

        strafeParallax(bg, wScroll, 60);
        strafeParallax(stars, wScroll, 15, starsX);
        strafeParallax(user, wScroll, 5);
    }

    return {
        init: () => window.addEventListener('scroll', startParallax)
    }

})();
export default parallaxScroll;