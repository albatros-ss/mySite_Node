'use strict';

const flip = (function () {
    function init() {
        let button = $('#welcome__auth-button');

        button.click(function () {
            $('#welcom-card').toggleClass('welcom-card_back ');
            button.parent().hide();
        });
        $('#auth-back').click(function () {
            $('#welcom-card').toggleClass('welcom-card_back ');
            button.parent().show();
        });
    }

    return {
        init: () => init()
    };
})();
export default flip;