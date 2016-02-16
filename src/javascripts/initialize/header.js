$(document).ready(function() {
  var isMobile = mobileCheck();
  var eventType = 'mouseover';

  if (isMobile) {
    eventType = 'click';

    $(document).on(eventType, '.header__user-item a', function() {
      window.location = $(this).attr('href');
    });

    $(document).on('scroll', function() {
      $('.header__dropdown-menu').hide();
    });
  }

  $(document).on(eventType, '.header__user-item', function() {
    $('.header__dropdown-menu').show();
    return false;
  });

  $(document).on(eventType, 'body', function() {
    $('.header__dropdown-menu').hide();
  });
});
