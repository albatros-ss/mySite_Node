'use strict';

const circle = (function () {

  function animationCircle() {
    let startAnimationElement = $('.about-skills__category'),
      scroll = window.pageYOffset + document.documentElement.clientHeight,
      posTop = startAnimationElement.offset().top;

    if (scroll > posTop) {
      $(window).off('scroll');
      startAnimation();
    }

    $(window).on('scroll', function () {
      scroll = window.pageYOffset + document.documentElement.clientHeight;

      if (scroll > posTop) {
        $(window).off('scroll');
        startAnimation();
      }
    });

    function startAnimation() {
      let items = $('.js-skill');

      items.each(function (i) {
        let $this = $(this),
          percent = $this.data('percent');

        $this.addClass('visible').css({
          'animation-delay': i / 5 + 's'
        }).find('.circle-progress__circle_fill').css({
          'animation-name': 'circle-progress-animation-' + percent,
          'animation-duration': '2s',
          'animation-fill-mode': 'both',
          'animation-delay': i / 5 + 's'
        });
      });
    }
  }

  return {
    init: () => animationCircle()
  };
})();
export default circle;