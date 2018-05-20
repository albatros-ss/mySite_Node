import prepareSend from '../common/prepareSend';

const auth = (function () {
    const formLogin = document.querySelector('.auth-form'),
        text = document.querySelector('.message__text'),
        mess = document.querySelector('.message');

    function prepareSendLogin(e) {
        e.preventDefault();
        let data = {
            login: formLogin.login.value,
            password: formLogin.password.value
        };

        prepareSend('/', formLogin, data, function(data) {
            text.innerHTML = data;
            mess.style.visibility = "visible";
            if (data === 'Авторизация успешна!') {
                location.href = '/admin';
            }
        });
    }
    return {
        init: () => formLogin.addEventListener('submit', prepareSendLogin)
    }
})();
export default auth;