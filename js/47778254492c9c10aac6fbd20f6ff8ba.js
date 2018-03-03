$(document).click(function(event){if($(event.target).closest(".js_search_result, .search_result").length)
{return!0}
$(".js_search_result, .search_result").fadeOut("slow")});$(".js_search_form input[type=text], #search input[type=text]").keyup(function(){if($(this).val())
{$(this).parents('.js_search_form, #search').addClass('active')}
else{$(this).parents('.js_search_form, #search').removeClass('active')}})