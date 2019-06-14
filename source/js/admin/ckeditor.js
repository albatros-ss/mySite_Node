'use strict';

import getRandomSalt from '../common/random-salt';

const ckeditor = (function () {
  class UploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        let file = this.loader.file,
          fileName = file.name,
          file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1),
          newFileName = getRandomSalt() + '.' + file_ext;

        data.append('img', file, newFileName);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'admin/loadImage', true);
        xhr.onload = function () {
          let result = JSON.parse(xhr.responseText);
          if (result.url) {
            resolve({
              default: result.url
            });
          } else {
            reject(result.status);
          }

        };
        xhr.send(data);
      });
    }

    abort() {
    }
  }

  return {
    init: () => {
      DecoupledEditor
        .create(document.querySelector('#editor'))
        .then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container');

          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
          };
          window.editor = editor;
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
})();
export default ckeditor;