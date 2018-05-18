import sendAjaxJson from '../common/sendAjax';

export default function prepareSend(url, form, data, cb) {
    const text = document.querySelector('.message__text'),
        mess = document.querySelector('.message');
    sendAjaxJson(url, data, function (data) {
        form.reset();
        text.innerHTML = data;
        mess.style.visibility = "visible";
        if (cb) {
            cb(data);
        }
    });
}