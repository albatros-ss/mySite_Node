'use strict';

const parallaxScroll = (function () {
  function startParallax() {
    const bg = document.getElementById('header__bg'),
      user = document.getElementById('author-card'),
      title = document.querySelector('.icon-js__title'),
      wScroll = window.pageYOffset,
      flag = true;

    function strafeParallax(block, windowScroll, strafeAmount, flag) {
      let strafe = windowScroll / -strafeAmount + '%';
      let transformString;
      if (flag) {
        transformString = `translate3d(-50%, ${strafe}, 0)`;
      } else {
        transformString = `translate3d(0, ${strafe}, 0)`;
      }

      block.style.transform = transformString;
    }

    strafeParallax(bg, wScroll, 60);
    strafeParallax(title, wScroll, 10, flag);
    strafeParallax(user, wScroll, 5);
  }

  return {
    init: () => window.addEventListener('scroll', startParallax)
  };

})();
export default parallaxScroll;