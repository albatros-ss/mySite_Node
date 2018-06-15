'use strict';

const ckeditor = (function () {

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            language: 'ru'
        } )
        .then( editor => {
            window.editor = editor;
        } )
        .catch( err => {
            console.error( err.stack );
        } );
})();
export default ckeditor;