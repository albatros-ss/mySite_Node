'use strict';

const scrollTo = (function () {
    function scrollTo(elements, duration) {
        elements = elements instanceof jQuery ? elements : $(elements);

        elements.click(function (event) {
            event.preventDefault();
            let targetPos = $($(this).attr('href')).offset().top;

            $('body, html').animate({
                scrollTop: targetPos
            }, duration);
        });

    }

    return {
        init: function (elements, duration) {
            scrollTo(elements, duration);
        }
    }
})();
export default scrollTo;