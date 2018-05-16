'use strict';

const parallaxMouse = (function () {
    function moveParallax(e) {
        let img = document.getElementById('bg'),
            initialX = (window.innerWidth / 2) - e.pageX,
            initialY = (window.innerHeight / 2) - e.pageY,
            divider = 150;
        img.style.transform = `translate3d(${initialX / divider}px, ${initialY / divider}px, 0)`;
    };
    return {
        init: () => window.addEventListener('mousemove', moveParallax)
    }
})();
export default parallaxMouse;