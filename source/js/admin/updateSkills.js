'use strict';

import prepareSend from '../common/prepareSend';

const formSkills = (function () {
    const formSkills = document.querySelector('.skills-form');
    const inp = $(formSkills).find('.skills-form__inp');
    let data = {};

    function prepareSendPost(e) {
        e.preventDefault();
        inp.each(function (indx, element) {
            data[element.name] = element.value;
        });

        prepareSend('/admin/updateskill', formSkills, data);
    }

    return {
        init: () => formSkills.addEventListener('submit', prepareSendPost)
    }
})();
export default formSkills;