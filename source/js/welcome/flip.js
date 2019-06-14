'use strict';

const flip = (function () {
  function init() {
    let button = $('#welcome__auth-button');

    button.click(function () {
      $('#welcome-card').toggleClass('welcome-card_back ');
      button.parent().hide();
    });
    $('#auth-back').click(function () {
      $('#welcome-card').toggleClass('welcome-card_back ');
      button.parent().show();
    });
  }

  return {
    init: () => init()
  };
})();
export default flip;