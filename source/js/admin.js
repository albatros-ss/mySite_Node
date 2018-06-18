'use strict';

import tabs from './admin/tabs';
import addsite from './admin/addsite';
import addblog from './admin/addblog';
import formskills from './admin/updateSkills';
import popup from './common/popup';
import ckeditor from './admin/ckeditor';

(function ($) {

    tabs.init();
    addsite.init();
    popup.init();
    addblog.init();
    formskills.init();
    ckeditor.init();

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            language: 'ru',
            
        } )
        .then( editor => {
            window.editor = editor;
        } )
        .catch( err => {
            console.error( err.stack );
        } );

    $("#site-img").change(function () {
        var filename = $(this).val().replace(/.*\\/, "");
        $("#img-name").html(filename);
    });

})(jQuery);