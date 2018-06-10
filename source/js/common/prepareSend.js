/**/
import sendAjaxJson from './sendAjax';

export default function prepareSend(url, form, data, cb) {
    sendAjaxJson(url, data, function (data) {
        form.reset();
        if (cb) {
            cb(data);
        }
    });
}