'use strict';

import prepareSend from './prepareSend';

const formBlog = (function () {
    const formBlog = document.querySelector('.blog-form');

    function prepareSendPost(e) {
        e.preventDefault();
        const date = new Date(formBlog.date.value).toLocaleDateString('ru', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        });
        let data = {
            title: formBlog.title.value,
            date: date,
            text: formBlog.text.value
        };
        prepareSend('/admin/addpost', formBlog, data);
    }

    return {
        init: () => formBlog.addEventListener('submit', prepareSendPost)
    }
})();
export default formBlog;