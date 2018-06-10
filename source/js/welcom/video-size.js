'use strict';

const videoSize = (function () {
    function sizingVideo() {
        let video = document.getElementById('video');
        if (window.innerWidth / window.innerHeight < 1.8) {
            video.style.width = "auto";
            video.style.height = "100%";
        } else {
            video.style.width = "100%";
            video.style.height = "auto";
        }
    }
    return {
        init: () => window.addEventListener('resize', sizingVideo),
        move: () => sizingVideo()
    }
})();
export default videoSize;