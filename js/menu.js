//Adaptive menu
$('.top-menu-btn').click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass('top-menu-btn--close');
});
$('.nav-btn').click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass('nav-btn--close');
})
