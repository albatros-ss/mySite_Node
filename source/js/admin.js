'use strict';

import tabs from './admin/tabs';
import addSite from './admin/addsite';
import addBlog from './admin/addblog';
import formSkills from './admin/updateSkills';
import popup from './common/popup';
import ckeditor from './admin/ckeditor';

(function ($) {

  tabs.init();
  addSite.init();
  popup.init();
  addBlog.init();
  formSkills.init();
  ckeditor.init();

  $("#site-img").change(function () {
    let filename = $(this).val().replace(/.*\\/, "");
    $("#img-name").html(filename);
  });

})(jQuery);