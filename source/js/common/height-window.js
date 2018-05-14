'use strict';

const heightWindow = (function () {
    function heightWindow () {

        let windowHeight = document.documentElement.clientHeight,
            wrap = document.querySelector('.wrap'),
            header = document.querySelector('.header');

        wrap.style.height = windowHeight + 'px';
        if(header) {
            header.style.height = windowHeight + 'px';
        }

        window.onresize = function () {
            windowHeight = document.documentElement.clientHeight;
            wrap.style.height = windowHeight + 'px';
            if(header) {
                header.style.height = windowHeight + 'px';
            }
        };
    }
    return {
        init: () => heightWindow()
    }
})();
export default heightWindow;