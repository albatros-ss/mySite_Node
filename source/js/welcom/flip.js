'use strict';

const flip = (function () {
    function init() {
        $('#welcome__auth-button').click(function () {
            $('#welcom-card').toggleClass('welcom-card_back ');
            $('#welcome__auth-button').hide();
        });
        $('#auth-back').click(function () {
            $('#welcom-card').toggleClass('welcom-card_back ');
            $('#welcome__auth-button').show();
        });
    }

    return {
            init: ()=> init()
    }
})();
export default flip;