$(document).ready(function () {
  // Anchor links
  $('body#home a[href*=#]').on('click', function (e) {
    e.preventDefault()

    let href = $(this).attr('href')

    if (typeof $(href).offset() === 'undefined') {
      return
    }

    $('html,body').animate({
      scrollTop: $(href).offset().top
    }, 350, 'swing')
  });

  // Customers slider
  $('.slick-slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    accessibility: false,
    focusOnSelect: false,
  });

  // Services
  $('.flyout').on('click keypress', function (e) {
    if (e.type === 'keypress' && e.charCode !== 13) {
      return
    }

    $('.flyout').removeClass('focus')

    let that = $(this)

    $(this).find('.content').slideToggle(200, 'swing', function () {
      that.toggleClass('active')
    });
  })

  // Contact form
  $('#contact-form input[type="submit"]').on('click', function (e) {
    e.preventDefault()

    let errors = false;
    let required = ['name', 'email', 'message'];

    // Validate required fields
    required.forEach(function (field) {
      let input = $('#' + field).val()

      if (!input) {
        $('.required__' + field).show(0)
        errors = true
      } else {
        $('.required__' + field).hide(0)
      }
    })

    // Validate email address
    let email = $('#email').val()

    if (email && !validateEmail(email)) {
      $('.required__email_invalid').show(0)
      errors = true
    } else {
      $('.required__email_invalid').hide(0)
    }

    // Validate message length
    let message = $('#message').val()

    if (!message || message.length < 40) {
      $('.required__message').show(0)
      errors = true
    } else {
      $('.required__message').hide(0)
    }

    // Form has errors
    if (errors) {
      $('html,body').animate({
        scrollTop: $('#contact').offset().top
      }, 0)

      $('.loading').fadeOut(200)

      return false
    }

    // Submit form
    $('.loading').fadeIn(200, function() {
      $('.required').hide(0)

      $.ajax({
        method: 'post',
        url: 'form.php',
        data: {
          name: $('#name').val(),
          email: $('#email').val(),
          message: $('#message').val()
        }
      })
      .done(function (msg) {
        if (msg === 'incomplete') {
          $('.required__incomplete').show(0)

          $('html,body').animate({
            scrollTop: $('#contact').offset().top
          }, 0)

          setTimeout(function () {
            $('.loading').fadeOut(500)
          }, 250)

          return
        }

        if (msg === 'invalid_email') {
          $('.required__email_invalid').show(0)

          $('html,body').animate({
            scrollTop: $('#contact').offset().top
          }, 0)

          setTimeout(function () {
            $('.loading').fadeOut(500)
          }, 250)

          return
        }

        $('#contact-form').hide(0)
        $('#form-feedback').html(msg).fadeIn(200)
        $('#contact-form').find('input[type="text"], input[type="email"], textarea').val('')

        $('html,body').animate({
          scrollTop: $('#form-feedback').offset().top-32
        }, 0)

        setTimeout(function () {
          $('.loading').fadeOut(500)
        }, 250)
      })
    })
  })

  // Portfolio
  $('.portfolio-item').on('click', function() {
    $(this).blur()
  })

  // Validate email
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Loading layer
  setTimeout(function () {
    $('.loading').fadeOut(500)
  }, 250)
})