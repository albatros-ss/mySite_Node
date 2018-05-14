'use strict';

import tabs from './admin/tabs';

(function ($) {
    
    tabs.init();

    $("#works-form__input-img").change(function() {
        var filename = $(this).val().replace(/.*\\/, "");
        $("#img-name").html(filename);
    });

})(jQuery);