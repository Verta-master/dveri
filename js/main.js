jQuery.fn.screenCenter = function () {
    this.css("position","absolute");
    //alert($(this).outerWidth());
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");
    return this;
}
$(document).ready(function (e) {
	$('body').on("click", ".more", function() {
		
		$('.more_hide').css('display','inline-block');
		$('.more').hide();
		$(this).prev().toggle();
        return false;
    });
	$('body').on("click", ".more_hide", function() {
		
		$('.more').css('display','inline-block');
		$('.more_hide').hide();
		$(this).prev().prev().toggle();
        return false;
    });

    $('.page_nastr').on('change', function() {
        var nastr = $(this).val();
        $.ajax({
            type: 'POST',
            data: {
                module: 'shop',
                action: 'change_page_nastr',
                nastr: nastr
            },
            success: (function(response) {
                location.reload();
            })
        });
    });

    $('body').on("click", ".popup .popup__close, .popup-shadow, .popup .link__close", function() {
        if ($(this).closest('.cart_one_click').size() == 0) {
            $('#popup-content').hide();
            $('.popup-shadow').hide();
        }
        return false;
    });

    // когда ответ пришел, то данные помещаются в контейнер <div class="ab_list"></div>
// и отменяется стандартная обработка
    diafan_ajax.success['shop_buy'] = function(form, response){
        $('.popup-shadow').show();
        $('#popup-content').show();
    }

    diafan_ajax.success['feedback_popup'] = function(form, response){
        $('.popup-shadow').show();
        $('#popup-content').show();
    }

    $(document).ajaxStart(function() {
        $(".ajax-loader").show();
    });

    $(document).ajaxStop(function() {
        $(".ajax-loader").hide();
    });

    $(document).on('click', '.quickview', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            method: "GET",
            url: href,
            data: { action: 'quick' },
            cache: false
        }).done(function( data ) {
            $('.product-params__row_sizes .product-params__item:first').click();
            $('.popup-shadow').show();
            $('#popup-content').html(data).screenCenter().show();
        });
    });

    $(document).on('click', '.show_in_popup', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            method: "POST",
            url: href,
            data: { 'show_in_popup': true },
            cache: false
        }).done(function( data ) {
            $('.popup-shadow').show();
            $('#popup-content').html(data).screenCenter().show();
        });
    });

    $(document).on('mouseover', '.product-list .product-list__item', function() {
        var curImg = $(this).find('.product-list__outer .product-list__image img');
        $(this).find('.product-list__inner .product-list__image img').css({
            'width': curImg.outerWidth() + 'px',
            'height': curImg.outerHeight() + 'px',
            'max-width': 'none'
        });
    });





    var width_menu = $('.slide_menu').width();
    $('.slide_button').on('click', function () {
        if ($('.slide').hasClass('slide_left'))
        {
            $('body').css('overflow-x', 'none');
            $('.slide').animate({left: '0px'}, "slow", function () {
                $('.slide').removeClass('slide_left');
                $('.slide_menu').css('left', '-' + width_menu + 'px');
            });
        }
        else
        {
            $('body').css('overflow-x', 'hidden');
            $('.slide_menu').css('left', '0').css('height', $(document).height() + 'px');
            $('.slide').addClass('slide_left');
            $('.slide').animate({left: width_menu + 'px'}, "slow", function () {
            });
        }
    });


    $(document).on('click', ".shop-like", function (e) {
        var self = this;
        if ($(this).hasClass("active"))
            $(this).removeClass("active").removeClass("animate")
        else {
            $(this).addClass("animate");
            setTimeout(function () {
                $(self).addClass("active")
            }, 50)
                    ;
        }
        ;
        /* другие возможные действия */
    });

    $(".items-scroller").each(function (index, element) {

        var time = 700;
        var itemsPane = $(this);
        var itemPerScreen = itemsPane.data("item-per-screen");
        var controls = itemsPane.data("controls");

        if (!itemPerScreen)
            itemPerScreen = 5;

        var currentItem = 0;
        var totalItems = $(this).find(".item").length;

        //next
        $(".control-next" + "." + controls).click(function (e) {
            e.preventDefault();
            currentItem = currentItem + itemPerScreen;
            if (currentItem > totalItems - 1 || totalItems - 1 - currentItem < itemPerScreen)
                currentItem = totalItems - 1;
            itemsPane.scrollTo('.item:eq(' + currentItem + ')', time)
        });

        //prev
        $(".control-prev" + "." + controls).click(function (e) {
            e.preventDefault();
            if (currentItem == totalItems - 1)
                currentItem = currentItem - itemPerScreen * 2 + 1;
            else
                currentItem = currentItem - itemPerScreen;

            if (currentItem <= 0) {
                currentItem = 0;
                itemsPane.scrollTo(0, time)
            }
            else
                itemsPane.scrollTo('.item:eq(' + currentItem + ')', time)

        });


    });

    //$(".shop-row .shop-item:nth-child(3n-2)").addClass("first"); /*  Хак для IE8, который не понимает nth-child */

    var delay = 4000;

    var slides = $("#mp-slider .slide");
    var dotsContainer = $('<div class="dots-container"> </div>');
    $("#mp-slider").append(dotsContainer);

    slides.each(function (index, element) {
        var dot = $('<span class="dot">&nbsp;</div>');
        dotsContainer.append(dot);
        dot.click(function (e) {
            if (slideShowInterval)
                clearInterval(slideShowInterval);
            showSlide(index);
        });

    });

    var dots = $("#mp-slider .dots-container .dot");
    dots.eq(0).addClass("active");
    slides.eq(0).addClass("active");

    var slideShowInterval = setInterval(function () {
        var n = $("#mp-slider .slide.active").next().index();
        if (n > slides.length - 1)
            n = 0;
        showSlide(n);

    }, delay)

    function showSlide(n) {
        slides.removeClass("active");
        dots.removeClass("active");
        slides.eq(n).addClass("active");
        dots.eq(n).addClass("active");
    }

    function showNext() {
        echo($("#mp-slider .slide.active").next().index());

    }

    $('.page_sort_list').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            data: {
                action: 'layout_type',
                module: 'shop',
                type: 1,
            },
            success: function(data) {
                location.reload();
            }
        });
    });

    $('.page_sort_card').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            data: {
                action: 'layout_type',
                module: 'shop',
                type: 2,
            },
            success: function(data) {
                location.reload();
            }
        });
    });

});

/*
 *
 *      Инструмент отладки. Создает окошко, в которое выводит данные.
 */

function echo(text) {
    var debugWindow = $("#debug-window");
    if (!debugWindow.length) {
        debugWindow = $('<div id="debug-window"></div>');
        $("body").append($('<div id="debug-window-container"></div>').append(debugWindow)).append("<style>\
         #debug-window-container{ \
            position: fixed; \
            right: 10px; \
            bottom:0px; \
            width: 390px; \
            height: 200px; \
            z-index: 100000;\
            background-color: #000; \
            display: table-cell; \
            padding: 20px; \
            overflow:scroll; \
        } \
        \
        \
        #debug-window {\
            position:absolute;\
            bottom:0;\
            padding:20px;\
        }\
         \
    </style>");
    }
    $("#debug-window").append(text + "<br>");
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
