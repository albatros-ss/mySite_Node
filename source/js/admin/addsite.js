'use strict';
import fileUpload from './upload';

const formSite = (function () {
    const formSite = document.querySelector('.works-form'),
        imgName = document.querySelector('#img-name'),
        text = document.querySelector('.message__text'),
        mess = document.querySelector('.message');

    function prepareSendFile(e) {
        e.preventDefault();
        let formData = new FormData();
        let file = document
            .querySelector('#site-img')
            .files[0];
        let name = document
            .querySelector('#site-name')
            .value;
        let description = document
            .querySelector('#site-techn')
            .value;
        let link = document
            .querySelector('#site-href')
            .value;

        formData.append('photo', file, file.name);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('link', link);
        fileUpload('/admin/upload', formData, function (data) {
            formSite.reset();
            imgName.innerHTML = '';
            text.innerHTML = data;
            mess.style.visibility = "visible";
        });
    }

    return {
        init: () => formSite.addEventListener('submit', prepareSendFile)
    };
})();
export default formSite;