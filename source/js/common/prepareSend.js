'use strict';

import sendAjaxJson from './sendAjax';

export default function prepareSend(url, form, data, cb) {
    const text = document.querySelector('.message__text'),
        mess = document.querySelector('.message'),
        formSkills = document.querySelector('.skills-form'),
        formBlog = document.querySelector('.blog-form');

    sendAjaxJson(url, data, function (data) {
        if (form !== formSkills) {
            form.reset();
        }
        if (form === formBlog) {
            editor.setData('');
        }
        text.innerHTML = data;
        mess.style.visibility = "visible";
        if (cb) {
            cb(data);
        }
    });
}