var banner_current=!1;$('.js_bs_counter, .bs_counter').click(function(){banner_current=$(this);$("input[name='banner_id']",'.js_bs_form, .bs_form').val(banner_current.attr('rel'));$('.js_bs_form, .bs_form').submit();return!1});diafan_ajax.success.bs_click=function(form,response){if(banner_current.attr('target')=='_blank')
{window.open(banner_current.attr('href'),'_blank')}
else{window.location=banner_current.attr('href')}
return!1}