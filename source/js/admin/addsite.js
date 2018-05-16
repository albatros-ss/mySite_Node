'use strict';
import fileUpload from './upload';

const formSite = (function () {
    const formSite = document.querySelector('.works-form');
    const imgName = document.querySelector('#img-name');

    function prepareSendFile(e) {
        e.preventDefault();
        let formData = new FormData();
        let file = document
            .querySelector('#site-img')
            .files[0];
        let name = document
            .querySelector('#site-name')
            .value;
        let techn = document
            .querySelector('#site-techn')
            .value;
        let href = document
            .querySelector('#site-href')
            .value;

        formData.append('photo', file, file.name);
        formData.append('name', name);
        formData.append('techn', techn);
        formData.append('href', href);

        fileUpload('/admin/upload', formData, function (data) {
            alert(data);
            formSite.reset();
            imgName.innerHTML = '';
        });
    }
    
    return {
        init: () => formSite.addEventListener('submit', prepareSendFile)
    }
})();
export default formSite;