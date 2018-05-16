'use strict';

const blog = (function () {

    function blogNavigation() {

        let ndx,
            blog = $('.blog'),
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

        toggle.click(function () {
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
                offsetTop;

            if (!$target.hasClass('js-show-article')) {
                return;
            }
            ndx = $target.parent().index();

            offsetTop = article.eq(ndx).offset().top;

            $("html, body").stop().animate({
                scrollTop: offsetTop
            }, 500);

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
            });
            if (!current.length) {
                menu_items.eq(0).parent().removeClass('sidebar__item_active');
                return;
            }
            ndx = current.eq(-1).index();

            menu_items.each(function () {
                $(this).parent().removeClass('sidebar__item_active');
            });

            menu_items.eq(ndx).parent().addClass('sidebar__item_active');

            // sidemenu behaviour
            if (fromTop >= blog_nav_limit && window.innerWidth > tablets) {
                sidebar.addClass("js-sidebar_bottom");

            } else if (fromTop >= blog_nav_offset && window.innerWidth > tablets) {
                blog.addClass("blog_fixed");
                sidebar.removeClass("js-sidebar_bottom");

            } else {
                blog.removeClass("blog_fixed");
                sidebar.removeClass("js-sidebar_bottom");

            }
        }

        $(window).scroll(function () {
            fromTop = $(this).scrollTop();
            blog_nav_offset = navSidebar.offset().top;
            blog_nav_limit = footer.offset().top - sidebar.outerHeight();
            sidemenuLoad();
        });

        $(window).resize(function () {
            if (window.innerWidth <= 768) {
                blog.removeClass("blog_fixed");
            } else {
                if ($(window).scrollTop() >= navSidebar.offset().top) {
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