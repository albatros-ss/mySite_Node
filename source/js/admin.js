'use strict';

import tabs from './admin/tabs';
import addsite from './admin/addsite';

(function ($) {

    tabs.init();
    addsite.init();

    $("#site-img").change(function () {
        var filename = $(this).val().replace(/.*\\/, "");
        $("#img-name").html(filename);
    });

})(jQuery);