import prepareSend from '../common/prepareSend';

const mail = (function () {
    const formMail = document.querySelector('.feedback__form');
    function prepareSendMail(e) {
        e.preventDefault();
        let data = {
            name: formMail.name.value,
            email: formMail.email.value,
            text: formMail.text.value
        };
        prepareSend('/works', formMail, data);
    };
    return {
        init: () => formMail.addEventListener('submit', prepareSendMail)
    }
})();
export default mail;