'use strict';

const ckeditor = (function () {

    return {
        init: () => {
            ClassicEditor
                .create(document.querySelector('#editor'))
                .then(editor => {
                    window.editor = editor;
                })
                .catch(err => {
                    console.error(err.stack);
                });
        }
    };
})();
export default ckeditor;