if (window.innerWidth > 768) {
  $(function(){$('.nav__block .nav__item').hover(
    function(){
      $('.nav__block .nav__subitem').hide();
      $(this).find('.nav__subitem').fadeIn(200)},
    function(){
      $(this).find('.nav__subitem').hide()
    })
  })
}
