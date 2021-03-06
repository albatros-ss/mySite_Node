'use strict';

import prepareSend from '../common/prepareSend';

const formBlog = (function () {
  const formBlog = document.querySelector('.blog-form');

  function prepareSendPost(e) {
    e.preventDefault();
    if (!formBlog.date.value) {
      let newDate = new Date(),
        month = newDate.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      formBlog.date.value = `${newDate.getFullYear()}-${month}-${newDate.getDate()}`;
    }
    const date = new Date(formBlog.date.value).toLocaleDateString('ru', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    let data = {
      title: formBlog.title.value,
      date: date,
      text: editor.getData()
    };

    prepareSend('/admin/addpost', formBlog, data);
  }

  return {
    init: () => formBlog.addEventListener('submit', prepareSendPost)
  };
})();
export default formBlog;