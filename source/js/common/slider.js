'use strict';

const slider = (function () {

    let slider = $('#slider'),
        image = slider.find('#slider__main-image'),
        name = slider.find('#slider__slide-name'),
        description = slider.find('#slider__slide-description'),
        link = slider.find('#slider__slide-link'),
        items = slider.find('.li-slider__item'),
        current = 0,
        currentSlideItem,
        flag = true,
        firstText = false,
        prevButton = slider.find('#slider__prev'),
        nextButton = slider.find('#slider__next'),
        prevButtonImageCurrent = prevButton.find('.js-slider__control-image_current'),
        prevButtonImageNext = prevButton.find('.js-slider__control-image_next'),
        nextButtonImageCurrent = nextButton.find('.js-slider__control-image_current'),
        nextButtonImageNext = nextButton.find('.js-slider__control-image_next'),
        prevSlideItem,
        nextSlideItem;

    function validate(num) {
        let result;

        if (num < 0) {
            result = items.length - 1;
        }
        else if (num > items.length - 1) {
            result = 0;
        }
        else {
            result = num;
        }

        return result;
    }

    function calcSlides() {
        let prev = validate(current - 1),
            next = validate(current + 1);

        currentSlideItem = items.eq(current);
        prevSlideItem = items.eq(prev);
        nextSlideItem = items.eq(next);
    }

    function changeSlide() {
        flag = false;
        image.fadeOut(300, function () {
            changeBackground($(this), currentSlideItem.data('img')).fadeIn();
        });
        if (firstText) {
            textChange(name, currentSlideItem.data('name'), 'bounceIn');
            textChange(description, currentSlideItem.data('description'), 'bounceIn');
            link.attr('href', currentSlideItem.data('link'));
        }
        firstText = true;
        changeSlideControl(prevButtonImageNext, prevButtonImageCurrent, prevSlideItem.data('img'));
        changeSlideControl(nextButtonImageNext, nextButtonImageCurrent, nextSlideItem.data('img'), true);
        setTimeout(function () {
            flag = true;
        }, 700);
    }

    function changeBackground(elem, background) {
        elem.css('background-image', `url(${background})`);

        return elem;
    }

    function changeSlideControl(next, current, background, direction) {
        changeBackground(next, background).animate({
            top: '0%'
        }, function () {
            $(this).css('top', direction ? '100%' : '-100%');
        });

        current.animate({
            top: direction ? '-100%' : '100%'
        }, function () {
            changeBackground($(this), background).css('top', '0');
        });
    }

    function textChange(elem, text, animationName) {
        text = '' + text;
        let letters = text.split('');
        let str = `<span style="display: inline-block;">`;
        let animationDelay = 0;

        letters.forEach(function (letter, id) {
            animationDelay++;

            if (letter === ' ') {
                str += `&nbsp;</span><span style="display: inline-block;">`;
            } else {
                str += `<span id="letter-${id}"
                    class="${animationName}" 
                    style="display: inline-block; 
                    animation-delay:${animationDelay / 20}s">
                    ${letter}</span>`;
            }
        });
        str += '</span>';
        elem.html(str);
    }

    function nextSlide() {
        if (!flag) {
            return;
        }
        current = validate(++current);
        calcSlides();
        changeSlide();
    }

    function prevSlide() {
        if (!flag) {
            return;
        }
        current = validate(--current);
        calcSlides();
        changeSlide();
    }

    return {
        init: function () {
            calcSlides();
            changeSlide();
            nextButton.click(nextSlide);
            prevButton.click(prevSlide);
        }
    };
})();
export default slider;