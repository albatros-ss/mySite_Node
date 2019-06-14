'use strict';

const menu = (function () {
  const menu = $('#topbar__menu'),
    items = menu.find('.js-navigation__item'),
    button = document.getElementById('menu__button');

  function openMenu() {
    menu.toggleClass('topbar__menu_active');
    if (menu.hasClass('topbar__menu_active')) {
      let delay = 0.35;
      items.each(function () {
        delay = delay + 0.1;
        $(this).addClass('bounceIn').css('animation-delay', delay + 's');
      });
    } else {
      items.removeClass('bounceIn');
    }
  }

  return {
    init: () => button.addEventListener('click', openMenu)
  };
})();
export default menu;