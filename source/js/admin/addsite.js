'use strict';
import fileUpload from './upload';
import getRandomSalt from '../common/random-salt';

const formSite = (function () {
    const formSite = document.querySelector('.works-form'),
        imgName = document.querySelector('#img-name'),
        text = document.querySelector('.message__text'),
        mess = document.querySelector('.message');

    function prepareSendFile(e) {

        e.preventDefault();

        let formData = new FormData(),
            file = formSite.photo.files[0],
            name = formSite.name.value,
            description = formSite.description.value,
            link = formSite.link.value,
            fileName = file.name,
            file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1),
            newFileName = getRandomSalt() + '.' + file_ext;

        formData.append('photo', file, newFileName);
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
