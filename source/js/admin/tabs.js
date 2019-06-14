'use strict';

const tabs = (function () {
  const menu = $('#nav__admin'),
    items = menu.find('.js-nav__item'),
    main = $('.js-main_admin'),
    sectionList = main.find('.js-section');
  let ndx = 0;
  sectionList.eq(ndx).addClass("section_active");
  items.eq(ndx).addClass("nav__item_active");

  function tabsToggle(e) {
    e.preventDefault();

    const target = $(e.target);
    ndx = target.index();

    if (target.hasClass("js-nav__item")) {

      target
        .addClass("nav__item_active")
        .siblings()
        .removeClass("nav__item_active");

      sectionList
        .eq(ndx)
        .addClass("section_active")
        .siblings()
        .removeClass("section_active");

    }
  }

  return {
    init: () => menu.bind('click', tabsToggle)
  };
})();
export default tabs;