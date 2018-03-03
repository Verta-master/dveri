$(document).ready(function() {

    // console.log('test list');

    $(document).on('click', '.product-block__gallery .product-block__gallery__item', function() {
        // console.log('click!!!!!!');
        curSRC = $(this).attr('data-src');
        curLarge = $(this).attr('data-large');
        $(this).parent().find('.product-block__gallery__item').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.product-preview').find('.product-preview__image > img').attr('src', curSRC).attr('data-large', curLarge);
    });

    $(document).on('click', '.product-preview__info .product-params__item', function () {
        var $this = $(this);
        var param = $this.data("param");
        var paramValue = $this.data("paramValue");

        // console.log('click param');

        if (param && paramValue) {
            var $select = $('select[name=' + param + ']');
            // console.log($select.val());

            if ($select.length) {
                $select.find(":selected").removeAttr("selected").prop("selected", false);
                $select.find('option[value=' + paramValue + ']').attr("selected", "selected").prop("selected", true).trigger('change');
            }
        }
    });


    $(document).on('change', ".js_shop_depend_param, .shop_form .depend_param", function() {
        select_param_price($(this).parents('form'));
    });

    function select_param_price(th)
    {
        var param_code = '';
        $(".js_shop_depend_param, .depend_param", th).each(function(){
            param_code = param_code + '[' + $(this).attr('name') + '=' + $(this).val() + ']';
        });
        if($('.js_shop_param_price, .shop_param_price', th).length)
        {
            $('.js_shop_param_price, .shop_param_price', th).hide();
            if($('.js_shop_param_price' + param_code + ', .shop_param_price' + param_code, th).length)
            {
                $('.js_shop_param_price' + param_code + ', .shop_param_price'+param_code, th).show();
                var image_id = $('.js_shop_param_price' + param_code + ', .shop_param_price' + param_code, th).attr('image_id');
                if(image_id)
                {
                    th.parents('.js_shop, .shop, .product-block, .product-preview').find('.js_shop_img, .zooms1, .shop-item-big-images a, .shop-photo img, .product-block__gallery img').each(function(){
                        console.log($(this).attr('image_id'));
                        if($(this).attr('image_id') == image_id)
                        {
                            $(this).show();
                            $(this).trigger('click');
                        }
                        else
                        {
                            if($('.js_shop_param_price[image_id='+$(this).attr('image_id')+'], .shop_param_price[image_id='+$(this).attr('image_id')+']', th).length)
                            {
                                // $(this).hide();
                            }
                        }
                    });
                }
                if($('.js_shop_param_price' + param_code + ', .shop_param_price'+param_code, th).find('.js_shop_no_buy, .shop_no_buy').length)
                {
                    $('.js_show_waitlist, .shop_waitlist', th).show();
                    $('.js_shop_buy, .to-cart', th).hide();
                    $('.js_shop_one_click, .shop_one_click', th).hide();
                }
                else
                {
                    if($('.js_shop_no_buy_good, .shop_no_buy_good', th).length)
                    {
                        $('.js_shop_waitlist, .shop_waitlist', th).show();
                    }
                    else
                    {
                        $('.js_shop_waitlist, .shop_waitlist', th).hide();
                    }
                    $('.js_shop_buy, .to-cart', th).show();
                    $('.js_shop_one_click, .shop_one_click', th).show();
                }
            }
            else
            {
                th.parents('.js_shop, .shop, .product-preview').find('.js_shop_img, .shop_img img, .shop_all_img img').each(function(){
                    if($('.js_shop_param_price[image_id='+$(this).attr('image_id')+'], .shop_param_price[image_id='+$(this).attr('image_id')+']', th).length)
                    {
                        // $(this).hide();
                    }
                });
                $('.js_shop_buy, .to-cart', th).hide();
                $('.js_shop_one_click, .shop_one_click', th).hide();
                $('.js_shop_waitlist, .shop_waitlist', th).hide();
            }
        }
    }

    function empty_param_price(th)
    {
        var param_code = '';
        $(".js_shop_depend_param", th).each(function(){
            param_code = param_code + '['+$(this).attr('name')+'='+$(this).val()+']';
        });
        if($('.js_shop_param_price', th).length)
        {
            if($('.js_shop_param_price' + param_code, th).length)
            {
                if($('.js_shop_param_price' + param_code +' .js_shop_no_buy', th).length)
                {
                    var shop_depend_param = $(".js_shop_depend_param", th).first();
                    if(get_selected(shop_depend_param).next('option').length)
                    {
                        get_selected(shop_depend_param).next('option').attr('selected', 'selected');
                        empty_param_price(th);
                    }
                }
            }
        }
    }

    function depend() {

        var paramsActual = {};
        var pricesActual = {};

        var $params = $(document).find(".product-preview__info .product-params__item");
        $params.each(function () {
            var $this = $(this);
            if ($this.data("param")) {
                $this.removeClass("active");
            }
        });

        var $prices = $(document).find(".product-preview__info .product-params_price");
        $prices.hide().removeClass("active");

        $(document).find(".product-preview__info select.depend_param").each(function () {

            var $select = $(this);
            var param = $select.attr("name");
            var paramValue = $select.find(":selected").val();

            if (param && paramValue) {

                $params.each(function () {
                    var $this = $(this);
                    var p = $this.data("param");
                    var pV = $this.data("paramValue");

                    if (p == param && pV == paramValue) {
                        if (!$this.is(".product-params_price")) {
                            $this.addClass("active");
                            paramsActual[param] = paramValue;
                        }
                        else {
                            pricesActual[param] = paramValue;
                        }
                    }
                });
            }

        });

        $prices.each(function () {
            var $this = $(this);
            var param = $this.data("param");
            var paramValue = $this.data("paramValue");

            if (isPriceActual($this, paramsActual)) {
                if (propsCount(pricesActual) == 0 || (pricesActual[param] && pricesActual[param] == paramValue)) {
                    $this.addClass("active");
                }
                $this.show();
            }
        });
    }

    function isPriceActual($priceElement, paramsActual) {
        for (var p in paramsActual) {
            if (paramsActual.hasOwnProperty(p)) {
                var attrParam = $priceElement.attr(p);

                if (!attrParam) {
                    return false;
                }

                if (attrParam != paramsActual[p]) {
                    return false;
                }
            }
        }
        return true;
    }

    function propsCount(obj) {
        var count = 0;
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                count++;
            }
        }
        return count;
    }

    $(document).on("change", ".product-preview__info select.depend_param", function () {
        depend();
    });

});
