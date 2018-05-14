'use strict';

const blog = (function () {

    function blogNavigation () {

        let blog = $('.blog'),
            toggle = blog.find('#sidebar-toggle'),
            navSidebar = blog.find("#js-sidebar-container"),
            footer = $(".footer"),
            sidebar = $(".js-sidebar"),
            tablets = 768,
            additional_offset = 200,
            article = blog.find(".js-article"),
            menu_items = sidebar.find(".js-show-article"),
            fromTop = window.pageYOffset,
            blog_nav_offset = navSidebar.offset().top,
            blog_nav_limit = footer.offset().top - sidebar.outerHeight();

        sidemenuLoad();

        toggle.click(function() {
            $(document).bind('click', hiddenSidebar);
            navSidebar.toggleClass('blog__sidebar_active');
        });

        function hiddenSidebar(event) {
            if (!event.target.closest("#js-sidebar-container")) {
                navSidebar.removeClass('blog__sidebar_active');
                $(document).unbind('click', hiddenSidebar);
            }
        }

        navSidebar.bind('click', sidemenuBehaviour);

        function sidemenuBehaviour(event) {
            event.preventDefault();
            let $target = $(event.target),
                offsetTop = 0;

            if (!$target.hasClass('js-show-article')) {
                return;
            }

            let href = $target.attr("href");

            article.each(function() {

                let item = $(this).attr("data-article");
                if (item === href) {
                    offsetTop = $(this).offset().top;

                    $("html, body").stop().animate({
                        scrollTop: offsetTop
                    }, 500);

                }

            });

            $target
            .closest(navSidebar)
            .find('.sidebar__item')
            .removeClass('sidebar__item_active');
        }
        function sidemenuLoad() {
            let current = article.map(function () {
                    if ($(this).offset().top <= fromTop + additional_offset) {
                        return this;
                    }
                }),
                data_article = current.eq(-1).attr('data-article');

            menu_items.each(function() {

                let item = $(this).attr("href");

                if (item === data_article) {
                    $(this).closest(".sidebar__item").addClass('sidebar__item_active');
                } else {
                    $(this).closest(".sidebar__item").removeClass('sidebar__item_active');
                }

            });

            // sidemenu behaviour
            if(fromTop >= blog_nav_limit && window.innerWidth > tablets) {
                sidebar.addClass("js-sidebar_bottom");

            } else if (fromTop >= blog_nav_offset && window.innerWidth > tablets) {
                blog.addClass("blog_fixed");
                sidebar.removeClass("js-sidebar_bottom");

            } else {
                blog.removeClass("blog_fixed");
                sidebar.removeClass("js-sidebar_bottom");

            }
        }

        $(window).scroll(function() {
            fromTop = $(this).scrollTop();
            blog_nav_offset = navSidebar.offset().top;
            blog_nav_limit = footer.offset().top - sidebar.outerHeight();
            sidemenuLoad();
        });

        $(window).resize(function() {
            if(window.innerWidth <= 768){
                blog.removeClass("blog_fixed");
            } else {
                if($(window).scrollTop() >= navSidebar.offset().top) {
                    blog.addClass("blog_fixed");
                }
                navSidebar.removeClass("blog__sidebar_active");
            }
        })

    }

    return {
            init: () => blogNavigation()
    }
})();
export default blog;