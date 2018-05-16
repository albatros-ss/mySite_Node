import sendAjaxJson from './sendAjax';

export default function prepareSend(url, form, data, cb) {
  sendAjaxJson(url, data, function (data) {
    form.reset();
    alert(data);
    if (cb) {
      cb(data);
    }
  });
}