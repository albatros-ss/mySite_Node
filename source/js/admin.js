'use strict';

import tabs from './admin/tabs';
import addsite from './admin/addsite';
import addblog from './admin/addblog';
import formskills from './admin/updateSkills';
import popup from './common/popup';

(function ($) {

    tabs.init();
    addsite.init();
    popup.init();
    addblog.init();
    formskills.init();

    $("#site-img").change(function () {
        var filename = $(this).val().replace(/.*\\/, "");
        $("#img-name").html(filename);
    });

})(jQuery);