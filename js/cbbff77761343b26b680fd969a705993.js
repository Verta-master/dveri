$(document).on('change','.filter-block__list__item label input[type="checkbox"], .filter-block__color__item label input[type="checkbox"]',function(){if($(this).prop('checked')){$(this).closest('li').find('input[type="checkbox"]').prop('checked',!0);$(this).closest('li').addClass('active')}else{$(this).closest('li').removeClass('active');$(this).closest('li').find('input[type="checkbox"]').prop('checked',!1)}
$(this).closest('form').trigger('submit')});$(document).on('click',".js_shop_search_form input[type=checkbox]",function(){});$(".js_shop_search_form").on("slidestop",function(event,ui){$(this).trigger('submit')});diafan_ajax.before.shop_search=function(form){var pushURL='/'+decodeURIComponent($(form).data('current-link'))+'/?'+decodeURIComponent($(form).find('[name]').not('[name="ajax"]').serialize());if(!$(form).find('[name="brand[]"]:checked').size()){window.history.pushState("object or string","Title",pushURL)}
if(!$(".js_shop_list, .shop_list").length)
{$(form).removeClass('ajax').submit();return!1}
$(form).attr('method','POST')}
diafan_ajax.success.shop_search=function(form,response){if(response.redirect){window.location=response.redirect;return}
var k=0;$(".js_shop_list, .shop_list").text('');$(".js_shop_list, .shop_list").first().html(prepare(response.data)).focus();if(response.js){$('body').append(prepare(response.js))}
return!1}
$('.js_shop_search_form').each(function(){if($('.js_shop_search_cat_ids',this).length)
{shop_select_search_cat_id($(this),$('.js_shop_search_cat_ids',this).val())}
if($('.js_shop_search_site_ids',this).length)
{shop_select_search_site_id($(this),$('.js_shop_search_site_ids',this).val())}});$('.js_shop_search_cat_ids, .shop_search_cat_ids select').change(function(){shop_select_search_cat_id($(this).parents('form'),$(this).val())});$('.js_shop_search_site_ids, .shop_search_site_ids select').change(function(){shop_select_search_site_id($(this).parents('form'),$(this).val())});function shop_select_search_site_id(form,site_id)
{form.attr('action',$('.js_shop_search_site_ids option:selected, .shop_search_site_ids select option:selected',form).attr('path'));$('.js_shop_search_brand',form).each(function(){if($(this).attr('site_id')==site_id)
{$(this).show()}
else{$(this).hide();$('input[type=checkbox]',this).prop('checked',!1)}});if(!$('select[name=cat_id]',form).length)
{return}
var current_cat_id=$('select[name=cat_id] option:selected',form);if(current_cat_id.attr('site_id')!=site_id)
{$('select[name=cat_id] option',form).hide();$('select[name=cat_id] option[site_id='+site_id+']',form).show();var cat_id=$('select[name=cat_id] option[site_id='+site_id+']',form).first().attr('value');$('select[name=cat_id]',form).val(cat_id);shop_select_search_cat_id(form,cat_id)}}
function shop_select_search_cat_id(form,cat_id)
{$('.js_shop_search_param, .shop_search_param',form).each(function(){var cat_ids=$(this).attr('cat_ids').split(',');if(cat_ids==cat_id||cat_ids==0||$.inArray(0,cat_ids)>-1||$.inArray(cat_id,cat_ids)>-1)
{$(this).show()}
else{$(this).hide()}})}