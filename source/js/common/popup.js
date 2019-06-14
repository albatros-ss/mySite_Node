'use strict';

const popup = (function () {
  const mess = document.querySelector('.message'),
    button = document.querySelector('.js-message__btn');

  function close() {
    mess.style.visibility = "hidden";
  }

  return {
    init: () => button.addEventListener('click', close)
  };
})();
export default popup;