'use strict';

import prepareSend from '../common/prepareSend';

const mail = (function () {
  const formMail = document.querySelector('.feedback__form');
  let data;

  function prepareSendMail(e) {
    e.preventDefault();
    data = {
      name: formMail.name.value,
      email: formMail.email.value,
      text: formMail.text.value
    };
    grecaptcha.execute();
  }

  function onSubmitReCaptcha() {
    prepareSend('/works', formMail, data);
  }

  return {
    init: () => formMail.addEventListener('submit', prepareSendMail),
    send: () => onSubmitReCaptcha()
  };
})();
export default mail;